import { HttpServiceInterface } from "./Interface";
import { AxiosImplementation } from "./implementations/AxiosImplementation";

export const HttpService =
  (token: string) => (implementation: HttpServiceInterface) =>
    implementation(token);


