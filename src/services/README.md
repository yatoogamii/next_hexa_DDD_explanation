# Services

Contains all different services of our app.

# What is a service ?

A Service is a logic/feature that is not technically related to our domains or UI or the app overall.

It's something which should be totally independent of our app and then can work on his own. It will usually contains external library used or Abstract general feature like authentification, error handling or log system.

Inside the Services folder we have a folder for every Service.

Inside every service folder we have 3 things :

## Interface.ts

A File named Interface.ts which export a typescript type named {ServiceName}ServiceInterface and a typescript type which list all the possible dependencies.

The type should return a function which accept arguments. Those argument should be usefull for the whole service, otherwise it will be better to put them into the method which need them.

it return another function which accept dependencies as optional. It's a list of possible service used in the method or in the Service itself. It's optional because we might not need every service every time.

which finally return a object of every possible methods of our Service.

/services/http/Interface.ts

```ts
type HttpServiceInterfaceDependencies = {
  AuthService: () => {};
};

export type HttpServiceInterface = (token: string) => (
  dependencies?: HttpServiceInterfaceDependencies
) => {
  get: <TResponse>(
    url: string,
    params?: string[] | string
  ) => Promise<TResponse>;
  post: <TData, TResponse>(
    url: string,
    data: TData,
    params?: string[] | string
  ) => Promise<TResponse>;
};
```

here we say that the Http Service will have 2 methods (not less, not more) and we explicitly type the arguments and the return.

The way to return a function which return another function and so on is called [Currying](https://javascript.info/currying-partials), You might also look at the [Higher-Order Functions](https://eloquentjavascript.net/05_higher_order.html)

The depencencies are used to contact our app Services. We don't import directly the service in the file and using it to make our code more Abstract and the function [Pure](https://en.wikipedia.org/wiki/Pure_function). The way to manage service like this is also called [Dependencies injection](https://en.wikipedia.org/wiki/Dependency_injection).

## Service.ts

A File named Service.ts which export a function named {ServiceName}Service.

It will take as arguments the global arguments needed in the **Interface**. And return an function which take as arguments the implementation itself of the **Interface** and finally returning it with the global args.

/services/http/Service.ts

```ts
export const HttpService =
  (token: string) => (implementation: HttpServiceInterface) => {
    implementation(token);
  };
```

## Implementations

A folder which contains all the implementations of our services.

We can imagine having different implementation because of our needed which change or because we want to migrate to another Service. usually the implementation of a service will be related to only one service and will be call as {ImplementationName}Implementation.ts

/services/http/implementations/AxiosImplementation.ts

```ts
export const AxiosImplementation: HttpServiceInterface = (token) => (deps) => {
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    get: async <TResponse>(url: string, params?: string[] | string) => {
      return axiosInstance
        .get<TResponse>(url, {
          params,
        })
        .then((res) => res.data);
    },
    post: async <TData, TResponse>(
      url: string,
      data: TData,
      params?: string[] | string
    ) => {
      return axiosInstance
        .post<TResponse, AxiosResponse<TResponse>, TData>(url, data, { params })
        .then((res) => res.data);
    },
  };
};
```
