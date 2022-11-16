import { GetServerSideProps, NextPage } from "next";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import { alunoProps, produtoProps } from "../../../constants/models";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import StickyProduto from "../../../components/StickyProduto";

const ProdutosAccount = ({ produtosData }: {produtosData: produtoProps[]}) => {
  const route = useRouter();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {produtosData.map((aluno: alunoProps, index: number) => (
        <StickyProduto
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
  const produtosData = await (await axios.get(`${origin}/api/produtos`)).data;

  return {
    props: {
      produtosData: produtosData.data.produtos || [],
    },
  };
};


export default ProdutosAccount;