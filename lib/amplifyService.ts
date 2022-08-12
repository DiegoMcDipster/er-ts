import { API } from "aws-amplify";

export class AmplifyService {
  private apiName = "ertsRestApi";
  private queryStringParameters = {};
  private pathname = "";

  constructor(pathname: string, queryStringParameters: object) {
    this.pathname = pathname;
    this.queryStringParameters = queryStringParameters;
  }

  async get() {
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

  async put() {
    try {
      const response = await API.put(this.apiName, this.pathname, {
        queryStringParameters: this.queryStringParameters,
      });

      return response;
    } catch (error: any) {
      console.log("AmplifyService: The error is: ", error);
      throw error;
    }
  }
}
