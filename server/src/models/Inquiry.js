import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', InquirySchema);
