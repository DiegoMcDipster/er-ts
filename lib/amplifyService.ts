import { API } from "aws-amplify";

export class AmplifyService {
  private readonly _apiName = "ertsRestApi";

  constructor(
    private readonly _pathname: string,
    private readonly _queryStringParameters: object
  ) {}

  async get() {
    try {
      const response = await API.get(this._apiName, this._pathname, {
        queryStringParameters: this._queryStringParameters,
      });

      return response;
    } catch (error: any) {
      console.log("AmplifyService: there was an error in the get: ", error);
      throw error;
    }
  }

  async put() {
    try {
      const response = await API.put(this._apiName, this._pathname, {
        queryStringParameters: this._queryStringParameters,
      });

      return response;
    } catch (error: any) {
      console.log("AmplifyService: The error is: ", error);
      throw error;
    }
  }
}
