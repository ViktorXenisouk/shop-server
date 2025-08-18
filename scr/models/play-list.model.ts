import { Schema } from "mongoose";
import mongoose from "mongoose";
import { IPlaylist } from "../types/play-list.type";

const PlaylistSchema = new Schema<IPlaylist>(
    {
    name: { type: String },
    path: { type: String,unique:true },
    tags: { type: [String] },
    fullPath: { type: String, required: true, unique: true },
    parentPath: { type: String, required:false },
    discription: { type: String, default: '' },
    ids: { type: [mongoose.Schema.Types.ObjectId], ref: 'Product',default:[] }
}, { id: false, timestamps: false, });

export default mongoose.model('Playlist', PlaylistSchema)