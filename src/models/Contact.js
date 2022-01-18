import mongoose from 'mongoose';

// Contact
export const Contact = mongoose.model('contact', {
  firstName: String,
  lastName: String,
  email: String,
  plan: String
}, 'email');
