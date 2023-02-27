export type User = {
  email: string;
  name: string;
  lastName: string;
  id: number | string;
  isAdmin?: boolean;
  documentId?: number;
  birthdate?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
