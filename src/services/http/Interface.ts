type HttpServiceInterfaceDependencies = {
  AuthService: () => {};
};

export type HttpServiceInterface = (token?: string) => (
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
