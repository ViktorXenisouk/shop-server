import mongoose, { Schema, model } from 'mongoose';

const TopItemSchema = new Schema({
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
  category: {
    type: String,
    default: ''
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
    default: 0, // по умолчанию наименьший приоритет
  },
});

const TopItem = model('TopItem', TopItemSchema);

export default TopItem;