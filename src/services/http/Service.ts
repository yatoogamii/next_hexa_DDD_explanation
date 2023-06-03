import { HttpServiceInterface } from "./Interface";

export const HttpService =
  (token: string) => (implementation: HttpServiceInterface) => {
    implementation(token);
  };
