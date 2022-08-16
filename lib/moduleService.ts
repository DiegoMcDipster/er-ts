import { Subjects } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class ModuleService extends EntityService<Subjects> {
  constructor(uid: string, private _parentSubject: string) {
    super(uid);
    this.entityType = "module";
  }

  protected setFecthParams(): void {
    throw "Modules cannot be fetched. They are fetched by Subject";
  }

  protected setPutParams(action: string, value: string): void {
    this.pathname = `/entities/subject/modules/${action}/${value}`;
    this.params = {
      uid: this.uid,
      entityType: this.entityType,
      parentSubject: this._parentSubject,
    };
  }
}
