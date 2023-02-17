export interface UserType {
  nome: string;
  nomeCompleto?: string;
  idade: number;
  email: string;
  id?: string;
}

export interface UsersResultType {
  limit: number;
  total: number;
  offset: number;
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  pageCount: number;
  count: number;
  rows: UserType[] | never[];
}
