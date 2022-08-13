import { Subjects } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class ModuleService extends EntityService<Subjects> {
  constructor(uid: string) {
    super(uid);
    this.entityType = "module";
  }

  protected prepareFetch(): void {
    throw "Modules cannot be fetched. They are fetched by Subject";
  }

  protected preparePut(
    action: string,
    value: string,
    parentSubject: string
  ): void {
    if (!parentSubject) throw "ModuleService: a parentSubject must be provided";

    this.pathname = `/entities/subject/modules/${action}/${value}`;
    this.params = {
      uid: this.getUid(),
      entityType: this.entityType,
      parentSubject: parentSubject,
    };
  }
}
