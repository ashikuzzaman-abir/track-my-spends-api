import bucket from './bucket.gcp';
import sharp from 'sharp';
const uploader = (file: any) => {
  try {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      gzip: true,
      metadata: {
        contentType: file.mimetype,
      },
    });
    blobStream.on('finish', () => {
      console.log('File uploaded to GCS');
    });
    blobStream.end(file.buffer);
    console.log('File uploaded to GCS');
    return {
      imageLocation: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
    };
  } catch (error: any) {
    // throw new Error(error.message);
    console.log(error.message);
  }
};

export default uploader;

export const compressUploader = async (file: any) => {
  try {
    let publicUrl;
    const processedImage = await sharp(file.buffer)
      .resize({ width: 500, height: 500 })
      .png()
      .toBuffer();
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      gzip: true,
      metadata: {
        contentType: file.mimetype,
      },
    });

    const uploadPromise = new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.log(err);
        reject(err);
      });

      blobStream.on('finish', () => {
        console.log('File uploaded to GCS');
        resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      });
    });

    blobStream.end(processedImage);

    const imageLocation = await uploadPromise;

    return {
      imageLocation,
    };
  } catch (error: any) {
    console.log(error.message);
  }
};
