import type { NextPage, GetServerSideProps } from "next";

import React, { Key, useState, useEffect, useId } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

import { alunoProps, empresaProps, instituicaoProps, professorProps } from "../constants/models";
import AlunoDashboard from "../components/AlunoComponents/AlunoDashboard";
import ProfessoresDashboard from "../components/ProfessorComponents/ProfessorDashboard";
import EmpresaDashboard from "../components/EmpresaComponents/EmpresaDashboard";

interface homeProps {
  alunosData: alunoProps[];
  instituicoesData: instituicaoProps[];
  professoresData: professorProps[];
  empresasData: empresaProps[];
}
const Home: NextPage<homeProps> = ({ alunosData, professoresData, instituicoesData, empresasData }) => {
  console.log(alunosData, professoresData, instituicoesData, empresasData)
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
        <EmpresaDashboard
          results={empresasData}
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
  const empresasData = await (await axios.get(`${origin}/api//users/empresas`)).data;

  return {
    props: {
      alunosData: alunosData.data.alunos || [],
      professoresData: professoresData.data.professores || [],
      instituicoesData: instituicoesData.data.instituicoes || [],
      empresasData: empresasData.data.empresas || []
    },
  };
};

export default Home;

