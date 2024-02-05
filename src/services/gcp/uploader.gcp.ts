import bucket from './bucket.gcp';

const uploader = (file: any) => {
  try {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
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
      imageLocation: `${process.env.GCP_BUCKET_URL}/${file.originalname}`,
      blob,
    };
  } catch (error: any) {
    // throw new Error(error.message);
    console.log(error.message);
  }
};

export default uploader;
