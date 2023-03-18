import { CommonConfigs } from "@/constants/appConfigs";

export class FetchHttp {
  private baseUrl: string = CommonConfigs.baseUrl;

  get(path: string, request?: RequestInit) {
    return fetch(this.baseUrl + path, { ...request, headers: { ...request?.headers, "Content-Type": "application/json" }, method: "GET", credentials: "include" }).then(this.handleError);
  }

  post(path: string, request?: RequestInit) {
    return fetch(this.baseUrl + path, { ...request, headers: { ...request?.headers, "Content-Type": "application/json" }, method: "POST", credentials: "include" }).then(this.handleError);
  }

  handleError(res: Response) {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Error", { cause: res });
  }
}
