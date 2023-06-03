# Domains

Contains the Entity and repositories for them. This folder contents should be totally independant of the whole project. It should'nt import anything from outside (unless library used inside).

# Entity

This is the data model of our domain. It will be refered as a typescript type which export the different data of the domain. Some example :

/user/Entity.ts

```ts
export type UserID = string;

export type User = {
  id: UserID;
  firstname: string;
  lastname: string;
  password: string;
};

export type NewUser = {
  firstname: string;
  lastname: string;
  password: string;
};

export type UpdateUser = {
  firstname: string;
  lastname: string;
};
```

/article/Entity.ts

```ts
export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type NewArticle = {
  title: string;
  content: string;
  authorId: string;
};
```

# Repositories

A repository is where we gonna connect our domain entity and the database. It's splited in 3 parts.

## Interface

A File named Interface.ts which export a typescript type named {DomainName}RepositoryInterface and a typescript type which list all the possible dependencies.

The type should return a function which accept arguments. Those argument should be usefull for the whole repository, otherwise it will be better to put them into the method which need them.

it return another function which accept dependencies as optional. It's a list of possible service used in the method above or in the repository itself. It's optional because we might not need every service every time.

which finally return a object of every possible methods of our repository.

For example:

/user/repositories/Interface.ts

```ts
type UserRepositoryInterfaceDependencies = {
  httpService: () => {};
  authService: () => {};
};

export type UserRepositoryInterface = (args: any) => (
  dependencies?: UserRepositoryInterfaceDependencies
) => {
  create: (firstname: string, lastname: string) => Promise<User>;
  update: (id: UserID, newData: Partial<UpdateUser>) => Promise<void>;
  delete: (id: UserID) => Promise<void>;
};
```

here we say that the User entity will have 3 methods (not less, not more) and we explicitly type the arguments and the return.

The way to return a function which return another function and so on is called [Currying](https://javascript.info/currying-partials), You might also look at the [Higher-Order Functions](https://eloquentjavascript.net/05_higher_order.html)

The depencencies are used to contact our app Services. We don't import directly the service in the file and using it to make our code more Abstract and the function [Pure](https://en.wikipedia.org/wiki/Pure_function). The way to manage service like this is also called [Dependencies injection](https://en.wikipedia.org/wiki/Dependency_injection).

## Repository

A File named Repository.ts which export a function named {DomainName}Repository.

It will take as arguments the global arguments needed in the **Interface**. And return an function which take as arguments the implementation itself of the **Interface** and finally returning it with the global args.

/user/repositories/Repository.ts

```ts
export const UserRepository =
  (args?: any) => (implementation: UserRepositoryInterface) =>
    implementation(args);
```

The way to return a function which return another function and so on is called [Currying](https://javascript.info/currying-partials), You might also look at the [Higher-Order Functions](https://eloquentjavascript.net/05_higher_order.html)

## Implementations

A folder which contains all the implementations of our repository.

We can imagine having different implementation because of our needed which change or because we want to migrate to another Database. usually the implementation of a repository will be related to only one database and will be call as {DatabaseName}Implementation.ts

/user/repositories/implementations/PrismaImplementation.ts

```ts
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
```

If we didnt mess up somewhere above then by giving the `UserRepositoryInterface` to our implementation we will not need to specify the type of our args because typescript will infered it from the `UserRepositoryInterface` already (and that's where the magic start).
