import { API } from "aws-amplify";
import { FieldVerification } from "./FieldVerification";

export class AmplifyService {
  private readonly _apiName = "ertsRestApi";
  private verifier: FieldVerification;

  constructor(
    private readonly _pathname: string,
    private readonly _queryStringParameters: object
  ) {
    this.verifier = new FieldVerification();
  }

  async get<E>(): Promise<E> {
    try {
      this.verifier.verifyField(this._pathname, "pathname", "get");
      this.verifier.verifyField(
        this._queryStringParameters,
        "queryStringParameters",
        "get"
      );

      const response: E = await API.get(this._apiName, this._pathname, {
        queryStringParameters: this._queryStringParameters,
      });

      return response;
    } catch (error: any) {
      console.log("AmplifyService: there was an error in the get: ", error);
      throw error;
    }
  }

  async put<R>(): Promise<R> {
    try {
      this.verifier.verifyField(this._pathname, "pathname", "put");
      this.verifier.verifyField(
        this._queryStringParameters,
        "queryStringParameters",
        "get"
      );

      const response: R = await API.put(this._apiName, this._pathname, {
        queryStringParameters: this._queryStringParameters,
      });

      return response;
    } catch (error: any) {
      console.log("AmplifyService: The error is: ", error);
      throw error;
    }
  }
}
