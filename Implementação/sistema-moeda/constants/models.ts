export interface alunoProps extends userProps {
  id?: string;
  email?: string;
  rg?: string;
  endereco?: string;
  curso?: string;
  user?: userProps;
  userId?: string;

}

export interface instituicaoProps {
  id?: string;
  nome?: string;
  users?: userProps[];
}

export enum userType {
  ALUNO = "ALUNO",
  PROFESSOR = "PROFESSOR"
}

export interface userProps {
  id?: string;
  nome?: string;
  cpf?: string;
  instituicao?: instituicaoProps | undefined;
  instituicaoId?: string | undefined;
  conta?: contaProps | undefined;
  type?: userType;
  aluno?: alunoProps | undefined;
  professor?: professorProps | undefined;
}

export interface professorProps extends userProps {
  id?: string;
  departamento?: string;
}

export interface contaProps {
  id?: string;
  saldo?: number;
  usuario?: userProps | undefined;
}

export interface iconProps {
  className: string;
}