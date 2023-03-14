export enum userType {
  ALUNO = "ALUNO",
  PROFESSOR = "PROFESSOR"
}

export interface userProps {
  id?: string;
  nome?: string;
  conta?: contaProps | undefined;
  type?: userType;
  aluno?: alunoProps | undefined;
  professor?: professorProps | undefined;
  empresa?: empresaProps | undefined;
}

export interface alunoProps extends userProps {
  id?: string;
  email?: string;
  cpf?: string;
  rg?: string;
  endereco?: string;
  curso?: string;
  user?: userProps;
  userId?: string;
  instituicao?: instituicaoProps | undefined;
  instituicaoId?: string | undefined;
  produtosResgatados?: produtoProps[];
}

export interface professorProps extends userProps {
  id?: string;
  cpf?: string;
  departamento?: string;
  instituicao?: instituicaoProps | undefined;
  instituicaoId?: string | undefined;
}

export interface empresaProps extends userProps {
  id?: string;
  cnpj?: string;
  produtos?: produtoProps[];
}

export interface contaProps {
  id?: string;
  saldo?: number;
  users?: userProps[] | undefined;
}

export interface instituicaoProps {
  id?: string;
  nome?: string;
  alunos?: alunoProps[];
  professores?: professorProps[];
  empresas?: empresaProps[];
}

export interface produtoProps {
  id?: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  empresa?: empresaProps | undefined;
  empresaId?: string | undefined;
  alunos?: alunoProps[];
}

export interface notaFiscalProps {
  id?: string;
  valor?: number;
  data?: Date;
  tipo?: string;
  contaOrigem?: contaProps | undefined;
  contaDestino?: contaProps | undefined;
  contaOrigemId?: string | undefined;
  contaDestinoId?: string | undefined;
}

export interface iconProps {
  className: string;
}
