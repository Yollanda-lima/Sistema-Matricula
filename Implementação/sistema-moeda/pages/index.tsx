import type { NextPage, GetServerSideProps } from "next";

import React, { Key, useState, useEffect, useId } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { useRouter } from "next/router";

import StickyAluno from "../components/StickyAluno";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";

import { AddIcon } from "../icons/AddIcon";
import { alunoProps } from "../constants/models";

interface homeProps {
  results: alunoProps[];
}
const Home: NextPage<homeProps> = ({ results, instituicoes }) => {
  const [alunos, setAlunos] = useState(results);
  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [selectEditedAluno, setSelectEditedAluno] = useState<alunoProps>();
  const router = useRouter();
  const tempPostId = useId();

  const handleAddAluno = async ({ email, nome, cpf, rg, endereco, instituicao, curso }: alunoProps) => {
    // add Aluno optimistically to ui
    let oldAlunosState = alunos;
    try {
      const addAlunos = [
        ...alunos,
        {
          id: tempPostId,
          email, nome, cpf, rg, endereco, instituicao, curso
        },
      ];
      setAlunos(addAlunos);
      const { data } = await axios.post(`/api/users/alunos`, { email, nome, cpf, rg, endereco, instituicao, curso });
      // router.reload();
    } catch (error) {
      console.error(error);
      setAlunos(oldAlunosState);
    }
  };

  const handleEditAluno = async ({ email, nome, cpf, rg, endereco, instituicao, curso }: alunoProps) => {
    // add Aluno optimistically to ui
    let oldAlunosState = alunos;
    try {
      const editAlunos = alunos.map((aluno) => {
        if (aluno.id === selectEditedAluno?.id) {
          return {
            ...aluno,
            email, nome, cpf, rg, endereco, instituicao, curso
          };
        }
        return aluno;
      });
      setAlunos(editAlunos);
      const { data } = await axios.put(`/api/users/alunos/${selectEditedAluno?.id}`, {
        email, nome, cpf, rg, endereco, instituicao, curso
      });
      // if (data) {
      //   router.reload();
      // }
      setUpdateModalVisibility(!showUpdateModal);
      setSelectEditedAluno(undefined);
    } catch (error) {
      setAlunos(oldAlunosState);
      console.error(error);
    }
  };

  const handleSelectEditedAluno = (selectAluno: alunoProps) => {
    setSelectEditedAluno(selectAluno);
    setUpdateModalVisibility(!showUpdateModal);
  };

  const handleDeleteAluno = async (id: string) => {
    //delete aluno base on id
    const removeItem = alunos.filter((aluno) => aluno.id !== id);
    setAlunos(removeItem);
    try {
      await axios.delete(`/api/users/alunos/${id}`);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Take Alunos</title>
        <meta name="description" title="This is all about takings aluno" />
        <link rel="icon" href="/site_logo.ico" />
      </Head>

      <main className={styles.main}>
        {showAddModal && (
          <AddModal
            onHandleAddAluno={handleAddAluno}
            showAddModal={showAddModal}
            setAddModalVisibility={setAddModalVisibility}
            instituicoes={instituicoes}
          />
        )}
        {showUpdateModal && (
          <EditModal
            onHandleEditAluno={handleEditAluno}
            setSelectEditedAluno={setSelectEditedAluno}
            selectEditedAluno={selectEditedAluno}
            showUpdateModal={showUpdateModal}
            setUpdateModalVisibility={setUpdateModalVisibility}
            instituicoes={instituicoes}
          />
        )}
        <div className="mb-5" onClick={() => setAddModalVisibility(!showAddModal)}>
          <AddIcon className="w-16 hover:scale-125 hover:duration-700 ease-in-out duration-700 ease-out-in" />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {alunos?.map((aluno: alunoProps, index: Key | null | undefined) => (
            <StickyAluno
              key={index}
              data={aluno}
              onSelectEditedAluno={handleSelectEditedAluno}
              onDeleteAluno={handleDeleteAluno}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiAlunosURL = `${origin}/api/users/alunos`;
  const apiInstituicoesURL = `${origin}/api/instituicoes`;
  const alunosData = await (await axios.get(apiAlunosURL)).data;
  const instituicoesData = await (await axios.get(apiInstituicoesURL)).data;


  return {
    props: {
      results: alunosData.data.alunos,
      instituicoes: instituicoesData.data.instituicoes,
    },
  };
};

export default Home;

