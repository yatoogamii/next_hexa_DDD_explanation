import { UpdateUser, User, UserID } from "../Entity";

type UserRepositoryInterfaceDependencies = {
  HttpService: () => {};
  AuthService: () => {};
};

export type UserRepositoryInterface = (args?: any) => (
  dependencies?: UserRepositoryInterfaceDependencies
) => {
  create: (firstname: string, lastname: string) => Promise<User>;
  update: (id: UserID, newData: Partial<UpdateUser>) => Promise<void>;
  delete: (id: UserID) => Promise<void>;
};
