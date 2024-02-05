import { Storage } from '@google-cloud/storage';

const projectId = process.env.GCP_PROJECT_ID;
const keyFilename = process.env.GCP_KEY_FILENAME;
const bucketName = process.env.GCP_BUCKET_NAME;

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(bucketName);

export default bucket;
