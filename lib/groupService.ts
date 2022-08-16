import { Groups } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class GroupService extends EntityService<Groups> {
  constructor(uid: string) {
    super(uid);
    this.entityType = "group";
  }

  protected setFecthParams(): void {
    this.pathname = `/entities/${this.entityType}`;
    this.params = {
      uid: this.uid,
    };
  }

  protected setPutParams(action: string, value: string): void {
    this.pathname = `/entities/entity/${action}/${value}`;
    this.params = {
      uid: this.uid,
      entityType: this.entityType,
    };
  }
}
