import { EntityAction, EntityService } from "./entityService";
import { Subjects } from "../types/stateTypes";
import { AmplifyService } from "./amplifyService";

export class ModuleService extends EntityService<Subjects> {
  private entityType = "module";

  async fetchData(): Promise<Subjects> {
    throw "Data for a modules without subjects cannot be retrieved";
  }

  async putData(
    action: EntityAction,
    value: string,
    parentSubject: string
  ): Promise<Subjects> {
    if (!value) throw "ModuleService: an value must be passed";
    if (!action) throw "ModuleService: an action must be passed";
    if (!parentSubject) throw "ModuleService: a parentSubject must be provided";

    const pathname = `/entities/subject/modules/${action}/${value}`;
    const params = {
      uid: this.getUid(),
      entityType: this.entityType,
      parentSubject: parentSubject,
    };

    try {
      const apiHandler = new AmplifyService(pathname, params);
      const response = await apiHandler.put();

      if (response.message.includes("already exists")) throw response.message;

      return response;
    } catch (error) {
      console.log("ModuleService: The was an error during the put: ", error);
      throw error;
    }
  }
}
