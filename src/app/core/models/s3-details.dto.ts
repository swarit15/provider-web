export class S3BucketDetails {
    s3BucketName?: string;
    s3BucketRegion?: string;
    s3BucketAccessKey?: string;
    s3BucketSecretKey?: string;
}

export class S3ObjectModel {
    constructor(public url: string, public name: string) {}
}