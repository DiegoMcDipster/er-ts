import { ApiService } from "./apiService";

export class ApiHandler {
  constructor(private _handler: ApiService) {}

  async get<E>(pathname: string, params: object): Promise<E> {
    return await this._handler.get(pathname, params);
  }

  async put<R>(pathname: string, params: object): Promise<R> {
    return await this._handler.put(pathname, params);
  }
}
