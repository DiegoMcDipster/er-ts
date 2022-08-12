import { Groups } from "../types/stateTypes";
import { EntityAction, EntityService } from "./entityService";
import { AmplifyService } from "./amplifyService";

export class GroupService extends EntityService<Groups> {
  private entityType = "group";

  constructor(uid: string) {
    super(uid);
  }

  async fetchData(): Promise<Groups> {
    const pathname = `/entities/${this.entityType}`;
    const params = {
      uid: this.getUid(),
    };
    const apiService = new AmplifyService(pathname, params);

    const response = await apiService.get();

    if (response.length === 0) return [];

    return response[`${this.entityType}s`];
  }

  async putData(action: EntityAction, value: string): Promise<Groups> {
    if (!value) throw new Error("GroupService: an entity must be passed");
    if (!action) throw new Error("GroupService: an action must be passed");

    const pathname = `/entities/entity/${action}/${value}`;
    const params = {
      uid: this.getUid(),
      entityType: this.entityType,
    };

    try {
      const apiService = new AmplifyService(pathname, params);

      const response = await apiService.put();

      if (response.message.includes("already exists")) throw response.message;

      return response;
    } catch (error) {
      console.log("GroupService: The was an error during the put: ", error);
      throw error;
    }
  }
}
