import {
  EntityAction,
  EntityType,
  GetResponseType,
  Group,
  Groups,
  PutResponseType,
  Subjects,
} from "../types/stateTypes";
import { AmplifyService } from "./amplifyService";

export abstract class EntityService<U, R> {
  private readonly _apiName = "ertsRestApi";
  private _pathname?: string;
  private _params?: object;
  protected entityType?: EntityType;
  protected abstract setFecthParams(): void;
  protected abstract setPutParams(action: EntityAction, value: string): void;
  protected abstract setDataToReturn(response: GetResponseType): R;

  constructor(private readonly _uid: U) {}

  async fetchData(): Promise<R> {
    try {
      this.setFecthParams();

      if (!this._pathname)
        throw "EntityService: A pathname must be provided for the fetch";
      if (!this._params)
        throw "EntityService: A params object must be provided for the fetch";

      const apiHandler = new AmplifyService(this._pathname, this._params);
      const response = await apiHandler.get<GetResponseType>();

      return this.setDataToReturn(response);
    } catch (error) {
      console.log("entityService: error: ", error);
      throw error;
    }
  }

  async putData<R>(action: EntityAction, value: string): Promise<R> {
    if (!value) throw new Error("EntityService: an entity must be passed");
    if (!action) throw new Error("EntityService: an action must be passed");

    this.setPutParams(action, value);

    if (!this._pathname)
      throw "EntityService: A pathname must be provided for the fetch";
    if (!this._params)
      throw "EntityService: A params object must be provided for the fetch";

    try {
      const apiHandler = new AmplifyService(this._pathname, this._params);
      const response = await apiHandler.put<PutResponseType>();

      console.log("The put response is: ", response);

      if (response.message.includes("already exists")) throw response.message;

      return response as unknown as R;
    } catch (error) {
      console.log("EntityService: The was an error during the put: ", error);
      throw error;
    }
  }

  protected set pathname(value: string) {
    if (!value) throw "EntityService: an invalid pathname value cannot be set";
    this._pathname = value;
  }

  protected set params(value: object) {
    if (!value) throw "EntityService: and invalid params object cannot be set";
    this._params = value;
  }

  protected get apiName() {
    return this._apiName;
  }

  protected get uid(): U {
    return this._uid;
  }
}
