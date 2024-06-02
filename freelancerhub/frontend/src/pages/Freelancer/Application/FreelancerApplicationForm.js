import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-use-history';
import axios from 'axios';
import { db, storage } from '../../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fileUploadImage from "../../../Gallery/fileupload.png";
import '../../../styles/Freelancers/ApplicationForm.css';
import PdfPreview from '../../../components/PdfPreview';
import { useLocation } from "react-router-dom";
import Loading from '../../../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heading from "../../../components/Heading";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const ApplicationForm = () => {
  const history = useHistory();
  const location = useLocation();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    bids: '',
    cv: null,
    proposal: null,
    notes: '',
    cvName: '',
    proposalName: '',
    freelancerId: '',
    projectId: '',
  });
  const [previewUrls, setPreviewUrls] = useState({
    cvUrl: null,
    proposalUrl: null
  });
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading("Loading");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${location.state.project_key.projectID}`);
        if (response.status === 200) {
          const data = response.data;
          setCurrency(data.currencyInput);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state.project_key.projectID]);

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
    if (event.target.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setConfirmationOpen(true);
  };

  const handleCancelSubmission = async (event) => {
    setConfirmationOpen(false);
  };

  const confirmSubmit = async (event) => {
    try {
      setConfirmationOpen(false);
      setLoading("Submitting...");
      const cvUrl = formData.cv ? await uploadFileToBackend(formData.cv, 'cvs', location.state.project_key.projectID, location.state.user_key.freelancerID, formData.cv.type) : '';
      const proposalUrl = formData.proposal ? await uploadFileToBackend(formData.proposal, 'proposals', location.state.project_key.projectID, location.state.user_key.freelancerID, formData.proposal.type) : '';
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
        projectID: location.state.project_key.projectID,
        freelancerID: location.state.user_key.freelancerID,
        clientID: location.state.project_key.clientID,
        statusTime: new Date(),
        statusState: 2
      };

      const notifications = [
        {
          isRead: false,
          isPop: false,
          timestamp: new Date(),
          type: 1,
          priority: 1,
          projectID: `${location.state.project_key.projectID}`,
          clientID: `${location.state.project_key.clientID}`,
          to: `${location.state.user_key.freelancerID}`
        },
        {
          isRead: false,
          isPop: false,
          timestamp: new Date(),
          type: 2,
          priority: 2,
          projectID: `${location.state.project_key.projectID}`,
          freelancerID: `${location.state.user_key.freelancerID}`,
          to: `${location.state.project_key.clientID}`
        }
      ];

      await axios.post(`${process.env.REACT_APP_API_URL}/applications`,{ proposalData, notifications });

      history.push('/freelancers/projects-applied');
    } catch (error) {
      toast.error('Error submitting proposal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadFileToBackend = async (file, folder, projectID, freelancerID, fileType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('projectID', projectID);
    formData.append('freelancerID', freelancerID);
    formData.append('fileType', fileType);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading file: ', error);
      throw error;
    }
};

  return (
    <div>
      {loading && <Loading text={loading} />}
      <ToastContainer />
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
        Application
      </Heading>

      <ConfirmationDialog
        open={confirmationOpen}
        onClose={handleCancelSubmission}
        onConfirm={confirmSubmit}
        message="Are you sure you want to submit the application?"
      />

      <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
      <form onSubmit={handleSubmit}>
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

            <label className="proposalLabel" htmlFor="bids">*Bids({currency})</label>
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

            <button className="proposalSubmitButton" type="submit">Submit</button>
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

export default ApplicationForm;