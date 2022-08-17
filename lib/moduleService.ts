import { EntityAction, GetResponseType } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class ModuleService<U, R> extends EntityService<U, R> {
  constructor(uid: U, private _parentSubject: string) {
    super(uid);
    this.entityType = "module";
  }

  protected setFecthParams(): void {
    throw "Modules cannot be fetched. They are fetched by Subject";
  }

  protected setDataToReturn(response: GetResponseType): R | [] {
    throw "Modules cannot be fetched. They are fetched by Subject";
  }

  protected setPutParams(action: EntityAction, value: string): void {
    this.pathname = `/entities/subject/modules/${action}/${value}`;
    this.params = {
      uid: this.uid,
      entityType: this.entityType,
      parentSubject: this._parentSubject,
    };
  }
}
