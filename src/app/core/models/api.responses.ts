export interface ApiResponse {
    status: string;
    successMessage: string;
    errorMessage: string;
    timestamp: Date;
    response: any;
}

export interface EventsData {
    collectionName: string,
    createdOn: number,
    awsColName: string
}

export interface EventDesc {
  fileName: string,
  size: string,
  count: number
}


export class EventRequest {
    constructor(
        public collectionName: string
    ) {}
}
