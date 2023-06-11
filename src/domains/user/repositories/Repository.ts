import { UserRepositoryInterface } from "./Interface";
import { PrismaImplementation } from "./implementations/PrismaImplementation";

export const UserRepository =
  (args?: any) => (implementation: UserRepositoryInterface) =>
    implementation(args);