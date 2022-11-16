import { GetServerSideProps, NextPage } from "next";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import { alunoProps, userProps } from "../../../constants/models";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import StickyExtrato from "../../../components/StickyExtrato";
import ProdutoDashboard from "../../../components/ProdutoComponents/ProdutoDashboard";

const AlunoAccount = ({ empresaData }: {empresaData: userProps}) => {
  const route = useRouter();
  console.log(empresaData)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Conta de: {empresaData.nome}</h1>
      <p className={styles.description}>CNPJ: {empresaData.empresa.cnpj}</p>

      <ProdutoDashboard results={empresaData?.empresa?.produtos || []} />
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { origin } = absoluteUrl(req);
  const { id } = query;
  const empresaData = await (await axios.get(`${origin}/api/users/empresas/${id}`)).data;

  return {
    props: {
      empresaData: empresaData.data.empresa || {},
    },
  };
};

export default AlunoAccount;