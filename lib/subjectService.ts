import { EntityAction, GetResponseType } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class SubjectService<U, R> extends EntityService<U, R> {
  constructor(uid: U) {
    super(uid);
    this.entityType = "subject";
  }
  protected setFecthParams(): void {
    this.pathname = `/entities/${this.entityType}`;
    this.params = {
      uid: this.uid,
    };
  }

  protected setPutParams(action: EntityAction, value: string): void {
    this.pathname = `/entities/subject/${action}/${value}`;
    this.params = {
      uid: this.uid,
      entityType: this.entityType,
    };
  }

  protected setDataToReturn(response: GetResponseType): R | [] {
    if (response.subjects !== undefined) {
      return response.subjects as unknown as R;
    }

    return [];
  }
}
