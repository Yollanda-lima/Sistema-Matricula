import { GetServerSideProps, NextPage } from "next";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import { alunoProps, userProps } from "../../../constants/models";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import StickyExtrato from "../../../components/StickyExtrato";

const AlunoAccount = ({ alunoData, extratoData }: {alunoData: userProps}) => {
  const route = useRouter();
  console.log(alunoData)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Conta de: {alunoData.nome}</h1>
      <p className={styles.description}>CPF: {alunoData.cpf}</p>
      <p className={styles.description}>Curso: {alunoData.aluno?.curso}</p>
      <p className={styles.description}>Saldo: {alunoData.conta?.saldo}</p>

      <h1 className={styles.title}>Extrato</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {extratoData.map((aluno: alunoProps, index: number) => (
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
  const alunoData = await (await axios.get(`${origin}/api/users/alunos/${id}`)).data;
  const extrato = await (await axios.get(`${origin}/api/users/extratos/${id}`)).data;

  return {
    props: {
      alunoData: alunoData.data.aluno || {},
      extratoData: extrato.data.extrato
    },
  };
};

export default AlunoAccount;