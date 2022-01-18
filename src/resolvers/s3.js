import AWS from "aws-sdk";
import stream from "stream";

export class AWSS3Uploader {
  constructor(config) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || "us-east-1",
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  createUploadStream(key) {
    const pass = new stream.PassThrough();

    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.config.destinationBucketName,
          Key: key,
          Body: pass
        }, (_, error) => console.log(error)).promise()
    };
  }

  createDestinationFilePath(
    fileName,
    mimetype,
    encoding
  ) {
    return fileName;
  }

  async singleFileUploadResolver(
    parent,
    data
  ) {
    const { createReadStream, filename, mimetype, encoding } = await data;
    const streamA = createReadStream();

    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    );

    const uploadStream = this.createUploadStream(filePath);
    streamA.pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;
    const link = result.Location;

    return { filename, mimetype, encoding, url: link };
  }
}