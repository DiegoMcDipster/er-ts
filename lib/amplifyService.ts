import { API } from "aws-amplify";
import { Groups, Subjects } from "../types/stateTypes";

type GroupGetResponseType = {
  uid: string;
  groups: Groups;
};

type SubjectGetResponseType = {
  uid: string;
  subjects: Subjects;
};

type PutResponseType = {
  message: string;
  data: Groups | Subjects;
};

export class AmplifyService {
  private apiName = "ertsRestApi";
  private queryStringParameters = {};
  private pathname = "";

  constructor(pathname: string, queryStringParameters: object) {
    this.pathname = pathname;
    this.queryStringParameters = queryStringParameters;
  }

  async get(): Promise<GroupGetResponseType | SubjectGetResponseType> {
    try {
      const response = await API.get(this.apiName, this.pathname, {
        queryStringParameters: this.queryStringParameters,
      });

      return response;
    } catch (error: any) {
      console.log("AmplifyService: there was an error in the get: ", error);
      throw error;
    }
  }

  async put(): Promise<PutResponseType> {
    try {
      const response = await API.put(this.apiName, this.pathname, {
        queryStringParameters: this.queryStringParameters,
      });

      console.log("AmplifyServie: put: the response is: ", response);

      return response;
    } catch (error: any) {
      console.log("AmplifyService: The error is: ", error);
      throw error;
    }
  }
}
