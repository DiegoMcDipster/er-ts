export type EntityAction = "add" | "remove";

export abstract class EntityService<T> {
  private apiName = "ertsRestApi";
  private uid: string;

  constructor(uid: string) {
    if (!uid) throw new Error("EntityService: a UID must be passed");

    this.uid = uid;
  }

  abstract fetchData(): Promise<T>;
  abstract putData(
    action: EntityAction,
    value: string,
    subject?: string
  ): Promise<T>;

  getApiName() {
    return this.apiName;
  }

  getUid() {
    return this.uid;
  }
}
