import React, { Key, useState, useId } from "react";

import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import StickyAluno from "../components/StickyAluno";
import AddModal from "./AddModalAluno";
import EditModal from "./EditModalAluno";

import { AddIcon } from "../icons/AddIcon";
import { alunoProps, instituicaoProps } from "../constants/models";
import { NextPage } from "next";

interface pageAlunoProps {
  results: alunoProps[];
  instituicoes: instituicaoProps[];
}

const AlunoDashboard: NextPage<pageAlunoProps> = ({ results, instituicoes }) => {
  const [alunos, setAlunos] = useState(results);
  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [selectEditedAluno, setSelectEditedAluno] = useState<alunoProps>();
  const router = useRouter();
  const tempPostId = useId();

  const handleAddAluno = async ({ email, nome, cpf, rg, endereco, instituicaoId, curso }: alunoProps) => {
    // add Aluno optimistically to ui
    let oldAlunosState = alunos;
    try {
      const addAlunos = [
        ...alunos,
        {
          id: tempPostId,
          email, nome, cpf, rg, endereco, instituicaoId, curso
        },
      ];
      setAlunos(addAlunos);
      const { data } = await axios.post(`/api/users/alunos`, { email, nome, cpf, rg, endereco, instituicaoId, curso });
      router.reload();
    } catch (error) {
      console.error(error);
      setAlunos(oldAlunosState);
    }
  };

  const onSelectAccountAluno = (aluno: alunoProps) => {
    router.push(`/alunos/${aluno.id}`);
  };

  const handleEditAluno = async ({ email, nome, cpf, rg, endereco, instituicaoId, curso }: alunoProps) => {
    // add Aluno optimistically to ui
    let oldAlunosState = alunos;
    try {
      const editAlunos = alunos.map((aluno) => {
        if (aluno.id === selectEditedAluno?.id) {
          return {
            ...aluno,
            email, nome, cpf, rg, endereco, instituicaoId, curso
          };
        }
        return aluno;
      });
      setAlunos(editAlunos);
      const { data } = await axios.put(`/api/users/alunos/${selectEditedAluno?.id}`, {
        email, nome, cpf, rg, endereco, instituicaoId, curso
      });
      if (data) {
        router.reload();
      }
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
    <div className={styles.main}>
        
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
    <h1 className={styles.title}>Alunos</h1>
    <div className="mb-5" onClick={() => setAddModalVisibility(!showAddModal)}>
      <AddIcon className="w-16 hover:scale-125 hover:duration-700 ease-in-out duration-700 ease-out-in" />
    </div>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {alunos?.map((aluno: alunoProps, index: Key | null | undefined) => (
        <StickyAluno
          key={index}
          data={aluno}
          onSelectEditedAluno={handleSelectEditedAluno}
          onSelectAccountAluno={onSelectAccountAluno}
          onDeleteAluno={handleDeleteAluno}
        />
      ))}
    </div>
  </div>
  )
}

export default AlunoDashboard;