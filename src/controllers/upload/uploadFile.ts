import { Request, Response } from 'express';
// import bucket from '../../services/gcp/bucket.gcp';
import uploader from '../../services/gcp/uploader.gcp';

const uploadFile = (req: Request, res: Response) => {
  try {
    // handle the file upload
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const uploadedFile = uploader(req.file);
    if (!uploadFile)
      return res.status(500).json({ message: 'File upload failed' });
    res.status(200).json({
      message: 'File uploaded successfully',
      files: uploadedFile.imageLocation,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default uploadFile;
