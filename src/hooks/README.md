# Hooks

Contains all the React hooks used in our UI.

Those Hooks gonna be our way to communicate between the UI and the Repository/Service.

It's also help us to split our UI logic and Business logic better. Everything in the hooks should concerns only the logic between it and the repository/service. it should't handle the logic of the UI.

/hooks/useUser.ts

```ts
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
```

The UI will use the useUser hook to create, modify, delete, everything about the user. and provide to the UI the user itself. So the UI can display the User and/or formated it as he want for the UI or use it into another hooks...
