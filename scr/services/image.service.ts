import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import dotenv from 'dotenv'

dotenv.config();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET!,
});

class ImageService {
    public async UploadImage(file?: Express.Multer.File, folder?: string) {
        if (!file) {
            return { status: 404, message: 'Файл не передан' };
        }

        const f = folder ? `my-pet-project/${folder}` : 'my-pet-project'

        try {
            const result = await cloudinary.uploader.upload(
                file.path,
                {
                    folder: f,
                });

            await fs.unlink(file.path);

            return {
                status: 200,
                message: 'image succesfuly uploaded',
                data: { url: result.secure_url }
            };
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'loading error'
            };
        }
    }

    private async getUploadedImages(folder?: string) {
        const params = new URLSearchParams();
        params.append('max_results', '100');
        if (folder) {
            const prefix = folder.endsWith('/') ? folder : `${folder}/`;
            params.append('prefix', prefix);
        }

        const authString = `${API_KEY}:${API_SECRET}`;
        const authBase64 = Buffer.from(authString).toString('base64');

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?${params.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${authBase64}`,
                },
            });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`error during getting images: ${res.status} — ${errorText}`);
        }

        const data = await res.json();
        return data.resources;
    }

    public async GetImages(folder?: string) {
        try {
            const result = await this.getUploadedImages(folder)

            return {
                status: 200,
                data: result,
                message: 'images'
            }
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'server error'
            }
        }
    }
}

export { ImageService }