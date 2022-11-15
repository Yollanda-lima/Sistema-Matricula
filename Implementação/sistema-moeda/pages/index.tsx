import type { NextPage, GetServerSideProps } from "next";

import React, { Key, useState, useEffect, useId } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { useRouter } from "next/router";

import StickyAluno from "../components/StickyAluno";
import AddModal from "../components/AddModalAluno";
import EditModal from "../components/EditModalAluno";

import { AddIcon } from "../icons/AddIcon";
import { alunoProps, instituicaoProps, professorProps } from "../constants/models";
import AlunoDashboard from "../components/AlunoDashboard";
import ProfessoresDashboard from "../components/ProfessorDashboard";

interface homeProps {
  alunosData: alunoProps[];
  instituicoesData: instituicaoProps[];
  professoresData: professorProps[];
}
const Home: NextPage<homeProps> = ({ alunosData, professoresData, instituicoesData }) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Sistema de Moedas</title>
        <meta name="description" title="This is all about takings aluno" />
        <link rel="icon" href="/site_logo.ico" />
      </Head>

      <div className={styles.main}>
        
        <AlunoDashboard 
          results={alunosData}
          instituicoes={instituicoesData}
        />
        <ProfessoresDashboard 
          results={professoresData}
          instituicoes={instituicoesData}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const alunosData = await (await axios.get(`${origin}/api/users/alunos`)).data;
  const professoresData = await (await axios.get(`${origin}/api/users/professores`)).data;
  const instituicoesData = await (await axios.get(`${origin}/api/instituicoes`)).data;

  return {
    props: {
      alunosData: alunosData.data.alunos || [],
      professoresData: professoresData.data.professores || [],
      instituicoesData: instituicoesData.data.instituicoes || [],
    },
  };
};

export default Home;

