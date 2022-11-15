import React, { Key, useState, useId } from "react";

import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import StickyProfessores from "./StickyProfessor";
import AddModal from "./AddModalProfessor";
import EditModal from "./EditModalProfessor";

import { AddIcon } from "../icons/AddIcon";
import { professorProps, instituicaoProps } from "../constants/models";
import { NextPage } from "next";

interface pageProfessoresProps {
  results: professorProps[];
  instituicoes: instituicaoProps[];
}

const ProfessoresDashboard: NextPage<pageProfessoresProps> = ({ results, instituicoes }) => {
  const [professores, setProfessores] = useState(results);
  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [selectEditedProfessores, setSelectEditedProfessores] = useState<professorProps>();
  const router = useRouter();
  const tempPostId = useId();

  const handleAddProfessores = async ({ nome, cpf, instituicaoId, departamento }: professorProps) => {
    // add Professores optimistically to ui
    let oldProfessoressState = professores;
    try {
      const addProfessoress = [
        ...professores,
        {
          id: tempPostId,
          nome, cpf, instituicaoId, departamento
        },
      ];
      setProfessores(addProfessoress);
      const { data } = await axios.post(`/api/users/professores`, { nome, cpf, instituicaoId, departamento });
      // router.reload();
    } catch (error) {
      console.error(error);
      setProfessores(oldProfessoressState);
    }
  };

  const handleEditProfessores = async ({ nome, cpf, instituicaoId, departamento }: professorProps) => {
    // add Professores optimistically to ui
    let oldProfessoressState = professores;
    try {
      const editProfessoress = professores.map((professor) => {
        if (professor.id === selectEditedProfessores?.id) {
          return {
            ...professor,
            nome, cpf, instituicaoId, departamento
          };
        }
        return professor;
      });
      setProfessores(editProfessoress);
      const { data } = await axios.put(`/api/users/professores/${selectEditedProfessores?.id}`, {
        nome, cpf, instituicaoId, departamento
      });
      // if (data) {
      //   router.reload();
      // }
      setUpdateModalVisibility(!showUpdateModal);
      setSelectEditedProfessores(undefined);
    } catch (error) {
      setProfessores(oldProfessoressState);
      console.error(error);
    }
  };

  const handleSelectEditedProfessores = (selectProfessores: professorProps) => {
    setSelectEditedProfessores(selectProfessores);
    setUpdateModalVisibility(!showUpdateModal);
  };

  const onSelectAccountProfessor = (professor: professorProps) => {
    router.push(`/professores/${professor.id}`);
  };

  const handleDeleteProfessores = async (id: string) => {
    //delete professor base on id
    const removeItem = professores.filter((professor) => professor.id !== id);
    setProfessores(removeItem);
    try {
      await axios.delete(`/api/users/professores/${id}`);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
        
    {showAddModal && (
      <AddModal
        onHandleAddProfessor={handleAddProfessores}
        showAddModal={showAddModal}
        setAddModalVisibility={setAddModalVisibility}
        instituicoes={instituicoes}
      />
    )}
    {showUpdateModal && (
      <EditModal
        onHandleEditProfessor={handleEditProfessores}
        setSelectEditedProfessor={setSelectEditedProfessores}
        selectEditedProfessor={selectEditedProfessores}
        showUpdateModal={showUpdateModal}
        setUpdateModalVisibility={setUpdateModalVisibility}
        instituicoes={instituicoes}
      />
    )}
    <h1 className={styles.title}>Professores</h1>
    <div className="mb-5" onClick={() => setAddModalVisibility(!showAddModal)}>
      <AddIcon className="w-16 hover:scale-125 hover:duration-700 ease-in-out duration-700 ease-out-in" />
    </div>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {professores?.map((professor: professorProps, index: Key | null | undefined) => (
        <StickyProfessores
          key={index}
          data={professor}
          onSelectEditedProfessor={handleSelectEditedProfessores}
          onSelectAccountProfessor={onSelectAccountProfessor}
          onDeleteProfessor={handleDeleteProfessores}
        />
      ))}
    </div>
  </div>
  )
}

export default ProfessoresDashboard;