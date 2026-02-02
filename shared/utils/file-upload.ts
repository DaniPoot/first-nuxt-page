import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
})

interface UploadResponse {
  success: boolean,
  result: UploadApiResponse | undefined
}

export const fileUpload = async (fileBuffer: Buffer<ArrayBufferLike>) => {
  try {
    const uuidFileName = uuidv4()

    const uploadResult = await new Promise<UploadResponse>(async (resolve, reject) => {
      cloudinary
        .uploader
        .upload_stream({
          resource_type: 'image',
          public_id: uuidFileName,
          folder: 'nuxt_uploads'
        }, (error, result) => {
          if (error) {
            return reject({ success: false, error })
          }

          return resolve({ success: true, result })
        }).end(fileBuffer)
    })

    if (!uploadResult.success || !uploadResult.result) {
      throw new Error('Cant upload image')
    }

    return uploadResult.result.url
  } catch (error) {
    throw new Error('Error while loading file')
  }
}