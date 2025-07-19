import mongoose from "mongoose"

interface IPlaylist {
    name: string,
    path: string,
    tags: string[],
    fullPath: string,
    parentPath: string | null,
    discription: string,
    ids: [mongoose.Schema.Types.ObjectId],
}

export { IPlaylist }