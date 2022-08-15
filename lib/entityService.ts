import {
  GroupGetResponseType,
  Groups,
  PutResponseType,
  SubjectGetResponseType,
  Subjects,
} from "../types/stateTypes";
import { AmplifyService } from "./amplifyService";

export type EntityAction = "add" | "remove";

export abstract class EntityService<T> {
  private apiName = "ertsRestApi";
  private uid: string;
  protected pathname = "";
  protected params = {};
  protected entityType = "";
  protected abstract prepareFetch(): void;
  protected abstract preparePut(
    action: string,
    value: string,
    subject?: string
  ): void;

  constructor(uid: string) {
    if (!uid) throw new Error("EntityService: a UID must be passed");

    this.uid = uid;
  }

  async fetchData(): Promise<GroupGetResponseType | SubjectGetResponseType> {
    try {
      this.prepareFetch();

      const apiHandler = new AmplifyService(this.pathname, this.params);
      const response = await apiHandler.get();

      console.log("EntityService: fetch: the response is: ", response);

      // return response[`${this.entityType}s`];
      return response;
    } catch (error) {
      console.log("entityService: error: ", error);
      throw error;
    }
  }

  async putData(
    action: EntityAction,
    value: string,
    parentSubject: string = ""
  ): Promise<PutResponseType> {
    if (!value) throw new Error("EntityService: an entity must be passed");
    if (!action) throw new Error("EntityService: an action must be passed");

    this.preparePut(action, value, parentSubject);

    try {
      const apiHandler = new AmplifyService(this.pathname, this.params);
      const response = await apiHandler.put();

      if (response.message.includes("already exists")) throw response.message;

      return response;
    } catch (error) {
      console.log("EntityService: The was an error during the put: ", error);
      throw error;
    }
  }

  protected getApiName(): string {
    return this.apiName;
  }

  protected getUid(): string {
    return this.uid;
  }
}
