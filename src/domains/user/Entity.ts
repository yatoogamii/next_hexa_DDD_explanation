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
