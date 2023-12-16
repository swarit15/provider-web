import { Injectable } from '@angular/core';
import { S3BucketDetails, S3ObjectModel } from '../../models/s3-details.dto';
import S3, { ListObjectsV2Request } from 'aws-sdk/clients/s3';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import  SendData = ManagedUpload.SendData;
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3UtilService {

  constructor() { }

  private static getS3Object(bucketDetails: S3BucketDetails): S3 {
    return new S3( {
      region: bucketDetails.s3BucketRegion,
      accessKeyId: bucketDetails.s3BucketAccessKey,
      secretAccessKey: bucketDetails.s3BucketAccessKey,
    });
  }

  getBucketDetails(): S3BucketDetails {

    return {
      s3BucketName: environment.s3BucketName,
      s3BucketRegion: environment.s3Region,
      s3BucketAccessKey: environment.s3AccessKey,
      s3BucketSecretKey: environment.s3SecretKey
    };
  }

  fileUpload(file: File, key: string): Promise<SendData> {
    const contentType = file.type;
    const bucketDetails = this.getBucketDetails();
    const bucket = S3UtilService.getS3Object(bucketDetails);
    const params = {
      Bucket: bucketDetails.s3BucketName!,
      Key: key,
      Body: file,
      ACL: 'private',
      ContentType: contentType,
      CacheControl: 'no-store'
    };
    return bucket.upload(params).promise();
  }

  async uploadToS3(file: File, key: string): Promise<any> {
    try {
      await this.fileUpload(file, key);
      return 'true';
    } catch (error) {
      console.error(error);
      return 'File Upload Failed';
    }
  }

  getAllObjects(key: string) {
    const bucketDetails = this.getBucketDetails();
    const bucket = S3UtilService.getS3Object(bucketDetails);
    const params: ListObjectsV2Request = {
      Bucket: bucketDetails.s3BucketName!,
      Prefix: key
    };
    return bucket.listObjectsV2(params).promise();
  }

  listObjects(key: string) {
    return this.getAllObjects(key).then((response) => {
      let list = response.Contents?.map((responseDataList: any) =>
        console.log(responseDataList),
      );
    })
  }
}
