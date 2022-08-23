import { API } from "aws-amplify";
import { ApiService } from "./apiService";
import { FieldVerification } from "./FieldVerification";

export class AmplifyService implements ApiService {
  private readonly _apiName = "ertsRestApi";
  private verifier: FieldVerification;

  constructor() {
    this.verifier = new FieldVerification();
  }

  async get<E>(pathname: string, queryStringParameters: object): Promise<E> {
    try {
      this.verifier.verifyField(pathname, "pathname", "get");
      this.verifier.verifyField(
        queryStringParameters,
        "queryStringParameters",
        "get"
      );

      const response: E = await API.get(this._apiName, pathname, {
        queryStringParameters,
      });

      return response;
    } catch (error: any) {
      console.log("AmplifyService: there was an error in the get: ", error);
      throw error;
    }
  }

  async put<R>(pathname: string, queryStringParameters: object): Promise<R> {
    try {
      this.verifier.verifyField(pathname, "pathname", "put");
      this.verifier.verifyField(
        queryStringParameters,
        "queryStringParameters",
        "get"
      );

      const response: R = await API.put(this._apiName, pathname, {
        queryStringParameters,
      });

      return response;
    } catch (error: any) {
      console.log("AmplifyService: The error is: ", error);
      throw error;
    }
  }
}
