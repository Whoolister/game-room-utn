export type User = {
  email: string;
  password: string;
}

export function isUser(obj: any): obj is User {
  return obj.email !== undefined && obj.password !== undefined;
}
