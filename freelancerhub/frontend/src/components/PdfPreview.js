import React, { useState, useEffect } from 'react';
import { Document, pdfjs } from 'react-pdf';
import "./styles/PDFPreview.css";
import Loading from './Loading';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPreview = ({ fileUrl, fileName }) => {
  const [numPages, setNumPages] = useState(null);
  const [firstPageImage, setFirstPageImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true); 
        const pdf = await pdfjs.getDocument(fileUrl).promise;
        setNumPages(pdf.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPdf();
  }, [fileUrl]);

  const renderFirstPageImage = async () => {
    try {
      setLoading(true); 
      const pdf = await pdfjs.getDocument(fileUrl).promise;
      const firstPage = await pdf.getPage(1);
      const scale = 1;
      const viewport = firstPage.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await firstPage.render(renderContext).promise;

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL();
      return dataUrl;
    } catch (error) {
      console.error("Error rendering first page:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const loadFirstPageImage = async () => {
      const dataUrl = await renderFirstPageImage();
      setFirstPageImage(dataUrl);
    };
    loadFirstPageImage();
  }, [fileUrl]);

  if (loading) {
    return <Loading />; 
  }

  return (
    <div className="pdf-preview">
      {firstPageImage && (
        <>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <img className="previewImage" src={firstPageImage} alt="First Page Preview" />
          </a>
          <p>{fileName}</p>
        </>
      )}
    </div>
  );
};

export default PdfPreview;