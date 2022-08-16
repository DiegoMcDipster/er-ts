import { Subjects } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class SubjectService extends EntityService<Subjects> {
  constructor(uid: string) {
    super(uid);
    this.entityType = "subject";
  }
  protected setFecthParams(): void {
    this.pathname = `/entities/${this.entityType}`;
    this.params = {
      uid: this.uid,
    };
  }

  protected setPutParams(action: string, value: string): void {
    this.pathname = `/entities/subject/${action}/${value}`;
    this.params = {
      uid: this.uid,
      entityType: this.entityType,
    };
  }
}
