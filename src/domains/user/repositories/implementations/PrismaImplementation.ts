import { PrismaClient } from "@prisma/client";
import { UserRepositoryInterface } from "../Interface";
import { User } from "../../Entity";

export const PrismaImplementation: UserRepositoryInterface = (id) => (deps) => {
  const prisma = new PrismaClient();
  return {
    create: async (firstname, lastname) => {
      const newUser = await prisma.user.create({
        data: {
          firstname,
          lastname,
        },
      });

      return newUser as User;
    },
    update: async (id, newData) => {
      await prisma.user.update({
        where: { id },
        data: newData,
      });

    },
    delete: async (id) => {
      await prisma.user.delete({
        where: {
          id,
        },
      });
    },
  };
};
