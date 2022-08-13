import { Groups } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class GroupService extends EntityService<Groups> {
  constructor(uid: string) {
    super(uid);
    this.entityType = "group";
  }

  protected prepareFetch(): void {
    this.pathname = `/entities/${this.entityType}`;
    this.params = {
      uid: this.getUid(),
    };
  }

  protected preparePut(action: string, value: string, subject = ""): void {
    this.pathname = `/entities/entity/${action}/${value}`;
    this.params = {
      uid: this.getUid(),
      entityType: this.entityType,
    };
  }
}
