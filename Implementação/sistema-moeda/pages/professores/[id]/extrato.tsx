import { GetServerSideProps, NextPage } from "next";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import { alunoProps, userProps } from "../../../constants/models";
import styles from "../../../styles/Home.module.css";
import { Key } from "readline";
import StickyExtrato from "../../../components/StickyExtrato";

const ProfessorAccount = ({ extrato, professorData }: {professorData: userProps}) => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Extrato de {professorData.nome}</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {extrato.map((aluno: alunoProps, index: number) => (
        <StickyExtrato
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
  const extrato = await (await axios.get(`${origin}/api/users/extratos/${id}`)).data;
  const professorData = await (await axios.get(`${origin}/api/users/alunos/${id}`)).data;

  return {
    props: {
      extrato: extrato.data.extrato || {},
      professorData: professorData.data.aluno || {}
    },
  };
};

export default ProfessorAccount;