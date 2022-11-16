import React, { Key, useState, useId } from "react";

import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import StickyProduto from "../ProdutoComponents/StickyProduto";
import AddModal from "./AddModalProduto";
import EditModal from "./EditModalProduto";

import { AddIcon } from "../../icons/AddIcon";
import { produtoProps, instituicaoProps } from "../../constants/models";
import { NextPage } from "next";

interface pageProdutoProps {
  results: produtoProps[];
}

const ProdutoDashboard: NextPage<pageProdutoProps> = ({ results }) => {
  const [produtos, setProdutos] = useState(results);
  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [selectEditedProduto, setSelectEditedProduto] = useState<produtoProps>();
  const router = useRouter();
  const id = router.query.id as string;
  const tempPostId = router.query.produtoId as string;

  const handleAddProduto = async ({ nome, descricao, preco }: produtoProps) => {
    // add Produto optimistically to ui
    let oldProdutosState = produtos;
    try {
      const addProdutos = [
        ...produtos,
        {
          id: tempPostId,
          nome, descricao, preco
        },
      ];
      setProdutos(addProdutos);
      const { data } = await axios.post(`/api/users/empresas/${id}/produtos`, { nome, descricao, preco, empresaId: id });
      router.reload();
    } catch (error) {
      console.error(error);
      setProdutos(oldProdutosState);
    }
  };

  const onSelectAccountProduto = (produto: produtoProps) => {
    router.push(`/produtos/${produto.id}`);
  };

  const handleEditProduto = async ({ nome, descricao, preco }: produtoProps) => {
    // add Produto optimistically to ui
    let oldProdutosState = produtos;
    try {
      const editProdutos = produtos.map((produto) => {
        if (produto.id === selectEditedProduto?.id) {
          return {
            ...produto,
            nome, descricao, preco
          };
        }
        return produto;
      });
      setProdutos(editProdutos);
      const { data } = await axios.put(`/api/users/empresas/${id}/produtos/${selectEditedProduto?.id}`, {
        nome, descricao, preco
      });
      if (data) {
        router.reload();
      }
      setUpdateModalVisibility(!showUpdateModal);
      setSelectEditedProduto(undefined);
    } catch (error) {
      setProdutos(oldProdutosState);
      console.error(error);
    }
  };

  const handleSelectEditedProduto = (selectProduto: produtoProps) => {
    setSelectEditedProduto(selectProduto);
    setUpdateModalVisibility(!showUpdateModal);
  };

  const handleDeleteProduto = async (id: string) => {
    //delete produto base on id
    const removeItem = produtos.filter((produto) => produto.id !== id);
    setProdutos(removeItem);
    try {
      await axios.delete(`/api/users/empresas/${id}/produtos/${id}`);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
        
    {showAddModal && (
      <AddModal
        onHandleAddProduto={handleAddProduto}
        showAddModal={showAddModal}
        setAddModalVisibility={setAddModalVisibility}
      />
    )}
    {showUpdateModal && (
      <EditModal
        onHandleEditProduto={handleEditProduto}
        setSelectEditedProduto={setSelectEditedProduto}
        selectEditedProduto={selectEditedProduto}
        showUpdateModal={showUpdateModal}
        setUpdateModalVisibility={setUpdateModalVisibility}
      />
    )}
    <h1 className={styles.title}>Produtos</h1>
    <div className="mb-5" onClick={() => setAddModalVisibility(!showAddModal)}>
      <AddIcon className="w-16 hover:scale-125 hover:duration-700 ease-in-out duration-700 ease-out-in" />
    </div>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {produtos?.map((produto: produtoProps, index: Key | null | undefined) => (
        <StickyProduto
          key={index}
          data={produto}
          onSelectEditedProduto={handleSelectEditedProduto}
          onSelectAccountProduto={onSelectAccountProduto}
          onDeleteProduto={handleDeleteProduto}
        />
      ))}
    </div>
  </div>
  )
}

export default ProdutoDashboard;