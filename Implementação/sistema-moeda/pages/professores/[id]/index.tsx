import { GetServerSideProps, NextPage } from "next";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import { alunoProps, userProps } from "../../../constants/models";
import styles from "../../../styles/Home.module.css";
import { Key } from "readline";
import StickyContaAluno from "../../../components/StickyContaAluno";
import { useRouter } from "next/router";

const ProfessorAccount = ({ professorData }: {professorData: userProps}) => {
  const route = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Conta de: {professorData.nome}</h1>
      <p className={styles.description}>CPF: {professorData.cpf}</p>
      <p className={styles.description}>Instituição: {professorData.instituicao?.nome}</p>
      <p className={styles.description}>Departamento: {professorData.professor?.departamento}</p>
      <p className={styles.description}>Saldo: {professorData.conta?.saldo}</p>

      <a href={route.pathname.replace('[id]', route.query.id) + '/extrato'}>Meu Extrato</a>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {professorData.instituicao?.users?.map((aluno: alunoProps, index: number) => (
        <StickyContaAluno
          key={index}
          data={aluno}
        />
      ))}
    </div>
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { origin } = absoluteUrl(req);
  const { id } = query;
  const professorData = await (await axios.get(`${origin}/api/users/professores/${id}`)).data;

  return {
    props: {
      professorData: professorData.data.professor || {}
    },
  };
};

export default ProfessorAccount;