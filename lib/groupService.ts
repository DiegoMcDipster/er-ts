import { getProperty } from "../types/helpers";
import { EntityAction, GetResponseType } from "../types/stateTypes";
import { EntityService } from "./entityService";

export class GroupService<U, R> extends EntityService<U, R> {
  constructor(uid: U) {
    super(uid);
    this.entityType = "group";
  }

  protected setFecthParams(): void {
    this.pathname = `/entities/${this.entityType}`;
    this.params = {
      uid: this.uid,
    };
  }

  protected setPutParams(action: EntityAction, value: string): void {
    this.pathname = `/entities/entity/${action}/${value}`;
    this.params = {
      uid: this.uid,
      entityType: this.entityType,
    };
  }

  protected setDataToReturn(response: GetResponseType): R {
    return getProperty(response, "groups") as R;
  }
}
