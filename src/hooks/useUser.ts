import { NewUser, User } from "@/domains/user/Entity";
import { UserRepository } from "@/domains/user/repositories/Repository";
import { PrismaImplementation } from "@/domains/user/repositories/implementations/PrismaImplementation";
import { useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User>();

  const createUser = async ({ firstname, lastname }: NewUser) => {
    const { create } = UserRepository()(PrismaImplementation)();

    const newUser = await create(firstname, lastname);

    setUser(newUser);
  };

  return {
    user,
    createUser,
  };
};
