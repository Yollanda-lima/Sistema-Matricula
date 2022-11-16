import React, { Key, useState, useId } from "react";

import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import StickyEmpresa from "../EmpresaComponents/StickyEmpresa";
import AddModal from "./AddModalEmpresa";
import EditModal from "./EditModalEmpresa";

import { AddIcon } from "../../icons/AddIcon";
import { empresaProps, instituicaoProps } from "../../constants/models";
import { NextPage } from "next";

interface pageEmpresaProps {
  results: empresaProps[];
}

const EmpresaDashboard: NextPage<pageEmpresaProps> = ({ results }) => {
  const [empresas, setEmpresas] = useState(results);
  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [selectEditedEmpresa, setSelectEditedEmpresa] = useState<empresaProps>();
  const router = useRouter();
  const tempPostId = useId();

  const handleAddEmpresa = async ({ nome, cnpj }: empresaProps) => {
    // add Empresa optimistically to ui
    let oldEmpresasState = empresas;
    try {
      const addEmpresas = [
        ...empresas,
        {
          id: tempPostId,
          nome, cnpj
        },
      ];
      setEmpresas(addEmpresas);
      const { data } = await axios.post(`/api/users/empresas`, { nome, cnpj });
      router.reload();
    } catch (error) {
      console.error(error);
      setEmpresas(oldEmpresasState);
    }
  };

  const onSelectAccountEmpresa = (empresa: empresaProps) => {
    router.push(`/empresas/${empresa.id}`);
  };

  const handleEditEmpresa = async ({ nome, cnpj }: empresaProps) => {
    // add Empresa optimistically to ui
    let oldEmpresasState = empresas;
    try {
      const editEmpresas = empresas.map((empresa) => {
        if (empresa.id === selectEditedEmpresa?.id) {
          return {
            ...empresa,
            nome, cnpj
          };
        }
        return empresa;
      });
      setEmpresas(editEmpresas);
      const { data } = await axios.put(`/api/users/empresas/${selectEditedEmpresa?.id}`, {
        nome, cnpj
      });
      if (data) {
        router.reload();
      }
      setUpdateModalVisibility(!showUpdateModal);
      setSelectEditedEmpresa(undefined);
    } catch (error) {
      setEmpresas(oldEmpresasState);
      console.error(error);
    }
  };

  const handleSelectEditedEmpresa = (selectEmpresa: empresaProps) => {
    setSelectEditedEmpresa(selectEmpresa);
    setUpdateModalVisibility(!showUpdateModal);
  };

  const handleDeleteEmpresa = async (id: string) => {
    //delete empresa base on id
    const removeItem = empresas.filter((empresa) => empresa.id !== id);
    setEmpresas(removeItem);
    try {
      await axios.delete(`/api/users/empresas/${id}`);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
        
    {showAddModal && (
      <AddModal
        onHandleAddEmpresa={handleAddEmpresa}
        showAddModal={showAddModal}
        setAddModalVisibility={setAddModalVisibility}
      />
    )}
    {showUpdateModal && (
      <EditModal
        onHandleEditEmpresa={handleEditEmpresa}
        setSelectEditedEmpresa={setSelectEditedEmpresa}
        selectEditedEmpresa={selectEditedEmpresa}
        showUpdateModal={showUpdateModal}
        setUpdateModalVisibility={setUpdateModalVisibility}
      />
    )}
    <h1 className={styles.title}>Empresas</h1>
    <div className="mb-5" onClick={() => setAddModalVisibility(!showAddModal)}>
      <AddIcon className="w-16 hover:scale-125 hover:duration-700 ease-in-out duration-700 ease-out-in" />
    </div>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {empresas?.map((empresa: empresaProps, index: Key | null | undefined) => (
        <StickyEmpresa
          key={index}
          data={empresa}
          onSelectEditedEmpresa={handleSelectEditedEmpresa}
          onSelectAccountEmpresa={onSelectAccountEmpresa}
          onDeleteEmpresa={handleDeleteEmpresa}
        />
      ))}
    </div>
  </div>
  )
}

export default EmpresaDashboard;