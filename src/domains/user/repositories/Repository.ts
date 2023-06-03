import { UserRepositoryInterface } from "./Interface";

export const UserRepository =
  (args?: any) => (implementation: UserRepositoryInterface) =>
    implementation(args);
