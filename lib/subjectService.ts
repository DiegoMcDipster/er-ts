import { Subjects } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class SubjectService extends EntityService<Subjects> {
  constructor(uid: string) {
    super(uid);
    this.entityType = "subject";
  }
  protected prepareFetch(): void {
    this.pathname = `/entities/${this.entityType}`;
    this.params = {
      uid: this.getUid(),
    };
  }

  protected preparePut(
    action: string,
    value: string,
    parentSubject: string
  ): void {
    this.pathname = `/entities/subject/${action}/${value}`;
    this.params = {
      uid: this.getUid(),
      entityType: this.entityType,
    };
  }
}
