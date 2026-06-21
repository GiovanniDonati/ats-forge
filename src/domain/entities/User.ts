export interface UserEntity {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CredentialEntity {
  id?: string;
  userId: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}
