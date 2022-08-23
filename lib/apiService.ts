export interface ApiService {
  get: <E>(pathname: string, params: object) => Promise<E>;
  put: <R>(pathname: string, params: object) => Promise<R>;
}
