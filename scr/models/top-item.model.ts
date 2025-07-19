import mongoose, { model } from 'mongoose';
import { TopItem } from '../types/top-item.type';

const TopItemSchema = new mongoose.Schema<TopItem>({
  type: {
    type: String,
    required: true,
    enum: ['product', 'category', 'article'], // только эти типы
  },
    title:{
    type:String,
    required:true
  },
  url: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    default: 0,
  },
});

const TopItem = model('TopItem', TopItemSchema);

export default TopItem;