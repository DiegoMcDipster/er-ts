import {
  EntityAction,
  EntityType,
  GetResponseType,
  PutResponseType,
} from "../types/stateTypes";
import { AmplifyService } from "./amplifyService";
import { FieldVerification } from "./FieldVerification";

export abstract class EntityService<U, R> {
  private readonly _apiName = "ertsRestApi";
  private _pathname!: string;
  private _params!: object;
  protected entityType!: EntityType;
  protected abstract setFecthParams(): void;
  protected abstract setPutParams(action: EntityAction, value: string): void;
  protected abstract setDataToReturn(response: GetResponseType): R;
  protected verifier: FieldVerification;

  constructor(private readonly _uid: U) {
    this.verifier = new FieldVerification();
  }

  async fetchData(): Promise<R> {
    try {
      this.setFecthParams();

      this.verifier.verifyField(this._pathname, "pathname", "fetch");
      this.verifier.verifyField(this._params, "params", "fetch");

      const apiHandler = new AmplifyService(this._pathname, this._params);
      const response = await apiHandler.get<GetResponseType>();

      return this.setDataToReturn(response);
    } catch (error) {
      console.log(
        "EntityService: There was an Error during the fetch: ",
        error
      );
      throw error;
    }
  }

  async putData<R>(action: EntityAction, value: string): Promise<R> {
    this.verifier.verifyField(value, "value", "put");
    this.verifier.verifyField(action, "action", "put");

    this.setPutParams(action, value);

    this.verifier.verifyField(this._pathname, "pathname", "put");
    this.verifier.verifyField(this._params, "params", "put");

    try {
      const apiHandler = new AmplifyService(this._pathname, this._params);
      const response = await apiHandler.put<PutResponseType>();

      if (response.message.includes("already exists")) throw response.message;

      return response as unknown as R;
    } catch (error) {
      console.log("EntityService: There was an error during the put: ", error);
      throw error;
    }
  }

  protected set pathname(value: string) {
    this.verifier.verifyField(value, "pathname", "set");
    this._pathname = value;
  }

  protected set params(value: object) {
    this.verifier.verifyField(value, "params", "set");
    this._params = value;
  }

  protected get apiName() {
    return this._apiName;
  }

  protected get uid(): U {
    return this._uid;
  }
}
