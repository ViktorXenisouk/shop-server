import mongoose from "mongoose";

interface IContentBlock {
  type: 'imageWithText' | 'paragraph' | 'gallery';
  title:string,
  variant?: 'center' | 'left' | 'right';
  text?: string;
  image?: string;
}

const ContentBlockSchema = new mongoose.Schema<IContentBlock>(
  {
    type: { type: String, required: true },
    title:{type:String},
    variant: { type: String },
    text: { type: String },
    image: { type: String },
  },
  { _id: false }
);

const json = {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: String,
    content: { type: [ContentBlockSchema], required: true },
    coverImage: String,
    tags: [String],
    publishedAt: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}

const ArticleSchema = new mongoose.Schema(
json,
  { timestamps: true }
);

export default mongoose.model('Article', ArticleSchema);