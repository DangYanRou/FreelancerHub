const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

const storage = getStorage();

async function uploadFile(fileBuffer, folder, fileName, fileType) {
    const file = storage.bucket().file(`${folder}/${fileName}`);
    try {
      const metadata = {
        contentType: fileType,
      };
      await file.save(fileBuffer, { metadata });
      const publicUrl = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2025'
      });
      return publicUrl[0];
    } catch (error) {
      throw new Error('Error uploading file: ' + error.message);
    }
  }
  
  module.exports = {
    uploadFile
  };