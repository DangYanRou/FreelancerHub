import React, { useState } from "react";
import { useHistory } from 'react-router-use-history';
import { db, storage } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fileUploadImage from "../../Gallery/fileupload.png";
import '../../styles/Freelancers/ProposalForm.css';
import NavigationBar from "./NavigationBarFreelancer";
import PdfPreview from '../PdfPreview';
import { useLocation } from "react-router-dom";
import Loading from '../Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc } from "firebase/firestore";

const ProposalForm = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    bids: '',
    cv: null,
    proposal: null,
    notes: '',
    cvName: '',
    proposalName: ''
  });
  const [previewUrls, setPreviewUrls] = useState({
    cvUrl: null,
    proposalUrl: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
        [`${name}Name`]: file.name
      });
      handleFilePreview(name, file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDiscardFile = (fileType) => {
    setFormData({
      ...formData,
      [fileType]: null,
      [`${fileType}Name`]: ''
    });
    setPreviewUrls(prevUrls => ({
      ...prevUrls,
      [`${fileType}Url`]: null
    }));
  };

  const handleFilePreview = async (name, file) => {
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrls(prevUrls => ({
      ...prevUrls,
      [`${name}Url`]: fileUrl
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (!isConfirmed) return;
  
    setLoading(true);
    try {
      const { projectID, clientID } = location.state.project_key;
      const { freelancerID } = location.state.user_key;
      const cvUrl = formData.cv ? await uploadFile(formData.cv, 'cvs') : '';
      const proposalUrl = formData.proposal ? await uploadFile(formData.proposal, 'proposals') : '';
      const cvName = formData.cv ? formData.cvName : '';
      const proposalName = formData.proposal ? formData.proposalName : '';
  
      const proposalData = {
        fullname: formData.fullname,
        email: formData.email,
        bids: formData.bids,
        cvUrl,
        proposalUrl,
        cvName,
        proposalName,
        notes: formData.notes || '',
        createdAt: new Date()
      };
  
      const docId = `${projectID}_${freelancerID}`;
      await setDoc(doc(db, 'proposals', docId), proposalData);
  
      const notificationData = {
        message: `You have received an application for your Project ${location.state.project_key.projectID} from ${location.state.user_key.freelancerID}`,
        timestamp: new Date(),
        type: 1, 
        priority: 1,
        projectId: `${location.state.project_key.projectID}`,
        clientId: `${location.state.project_key.clientID}`,
        freelancerId: `${location.state.user_key.freelancerID}`
      };
      await addDoc(collection(db, 'notifications'), notificationData);
  
      toast.success('Proposal submitted successfully!');
  
      setTimeout(() => {
        history.push('/freelancers/projects-applied');
      }, 2000);
    } catch (error) {
      console.error("Error submitting proposal: ", error);
      const errorNotificationData = {
        message: 'Error submitting proposal. Please try again.',
        timestamp: new Date(),
        type: 'error',
        userId: `${location.state.user_key.freelancerID}`
      };
      await addDoc(collection(db, 'notifications'), errorNotificationData);
  
      toast.error('Error submitting proposal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file, folder) => {
    const storageRef = ref(storage, `${folder}/${location.state.project_key.projectID}_${location.state.user_key.freelancerID}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  return (
    <div>
      {loading && <Loading text="Submitting..." />}
      <NavigationBar />
      <ToastContainer />
      <h1 className="proposalSubmissionH1">Application</h1>

      <form onSubmit={handleSubmit} className="proposalForm">
        <div className="proposal-form">
          <div className="proposal-form-left">

            <label className="proposalLabel" htmlFor="fullName">*Full Name</label>
            <input
              className="proposalInput"
              type="text"
              id="fullName"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />

            <label className="proposalLabel" htmlFor="email">*Email</label>
            <input
              className="proposalInput"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="proposalLabel" htmlFor="bids">*Bids(RM)</label>
            <input
              className="proposalInput"
              type="number"
              id="bids"
              name="bids"
              value={formData.bids}
              onChange={handleChange}
              required
            />

            <label className="proposalLabel" htmlFor="notes">Notes</label>
            <textarea
              className="longtextinput"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />

            <button type="submit" className="proposalSubmitButton">Submit</button>

          </div>

          <div className="proposal-form-right">

            <label className="proposalLabel" style={{ fontSize: '26px' }}>Files Attachment</label>

            {previewUrls.cvUrl && (
              <>
                <label className="proposalLabel">CV Attached</label>
                <label className="file-preview-container">
                  <PdfPreview fileUrl={previewUrls.cvUrl} fileName={formData.cvName} />
                  <div className="file-preview-buttons">
                    <button type="button" className="file-preview-button" onClick={() => handleDiscardFile('cv')}>X</button>
                    <label type="button" className="file-preview-button">
                      <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" />
                      <input
                        className="file-upload-input"
                        type="file"
                        id="cv"
                        name="cv"
                        accept="application/pdf"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </label>
              </>
            )}

            {!previewUrls.cvUrl && (
              <label className="file-upload-label">
                <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" style={{ marginRight: '10px' }} />
                Upload Your CV Here
                <input
                  className="file-upload-input"
                  type="file"
                  id="cv"
                  name="cv"
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </label>
            )}

            {previewUrls.proposalUrl && (
              <>
                <label className="proposalLabel">Proposal Attached</label>
                <label className="file-preview-container">
                  <PdfPreview fileUrl={previewUrls.proposalUrl} fileName={formData.proposalName} />
                  <div className="file-preview-buttons">
                    <button type="button" className="file-preview-button" onClick={() => handleDiscardFile('proposal')}>X</button>
                    <label type="button" className="file-preview-button">
                      <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" />
                      <input
                        className="file-upload-input"
                        type="file"
                        id="proposal"
                        name="proposal"
                        accept="application/pdf"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </label>
              </>
            )}

            {!previewUrls.proposalUrl && (
              <label className="file-upload-label">
                <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" style={{ marginRight: '10px' }} />
                Upload Your Proposal Here
                <input
                  className="file-upload-input"
                  type="file"
                  id="proposal"
                  name="proposal"
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </label>
            )}

          </div>
        </div>
      </form>
    </div>
  );
};

export default ProposalForm;