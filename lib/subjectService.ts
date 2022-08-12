import { EntityAction, EntityService } from "./entityService";
import { Subjects } from "../types/stateTypes";
import { AmplifyService } from "./amplifyService";

export class SubjectService extends EntityService<Subjects> {
  private entityType = "subject";

  async fetchData(): Promise<Subjects> {
    const pathname = `/entities/${this.entityType}`;
    const params = {
      uid: this.getUid(),
    };

    const apiHandler = new AmplifyService(pathname, params);
    const response = await apiHandler.get();

    if (response.length === 0) return [];

    return response[`${this.entityType}s`];
  }

  async putData(action: EntityAction, value: string): Promise<Subjects> {
    if (!value) throw new Error("SubjectService: an entity must be passed");
    if (!action) throw new Error("SubjectService: an action must be passed");

    const pathname = `/entities/subject/${action}/${value}`;
    const params = {
      uid: this.getUid(),
      entityType: this.entityType,
    };

    try {
      const apiHandler = new AmplifyService(pathname, params);
      const response = await apiHandler.put();

      if (response.message.includes("already exists")) throw response.message;

      return response;
    } catch (error) {
      console.log("SubjectService: The was an error during the put: ", error);
      throw error;
    }
  }
}
