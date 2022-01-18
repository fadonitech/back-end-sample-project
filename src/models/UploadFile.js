import mongoose from 'mongoose';

// Upload File
export const UploadedFileResponse = mongoose.model('uploadedFileResponse', {
  filename: String,
  mimetype: String,
  encoding: String,
  url: String,
}, 'email');