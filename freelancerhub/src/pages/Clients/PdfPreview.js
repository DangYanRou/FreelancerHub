import React, { useState, useEffect } from 'react';
import { Document, pdfjs } from 'react-pdf';
import "../../styles/Clients/PDFPreview.css"

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPreview = ({ fileUrl, fileName }) => {
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjs.getDocument(fileUrl).promise;
      setNumPages(pdf.numPages);
    };
    loadPdf();
  }, [fileUrl]);

  const renderFirstPageImage = async () => {
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
  };

  const [firstPageImage, setFirstPageImage] = useState(null);

  useEffect(() => {
    const loadFirstPageImage = async () => {
      const dataUrl = await renderFirstPageImage();
      setFirstPageImage(dataUrl);
    };
    loadFirstPageImage();
  }, [fileUrl]);

  return (
    <div className="pdf-preview">
      {firstPageImage && (
        <>
          <img className='previewImage' src={firstPageImage} alt="First Page Preview" />
          <p>{fileName}</p>
        </>
      )}
    </div>
  );
};

export default PdfPreview;