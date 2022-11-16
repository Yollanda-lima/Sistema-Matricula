import React, { useEffect, useState } from "react";
import { produtoProps, instituicaoProps } from "../../constants/models";
import { useRouter } from "next/router";

interface editProps {
  onHandleEditProduto: (note: produtoProps) => void;
  selectEditedProduto: produtoProps | undefined;
  showUpdateModal: boolean;
  setSelectEditedProduto: React.Dispatch<React.SetStateAction<produtoProps | undefined>>;
  setUpdateModalVisibility: (visibility: boolean) => void;
}

const EditModal = ({
  onHandleEditProduto,
  selectEditedProduto,
  showUpdateModal,
  setSelectEditedProduto,
  setUpdateModalVisibility
}: editProps) => {
  const [nome, setNome] = useState<string | undefined>(selectEditedProduto?.nome);
  const [descricao, setDescricao] = useState<string | undefined>(selectEditedProduto?.descricao);
  const [preco, setPreco] = useState<number | undefined>(selectEditedProduto?.preco);
  const router = useRouter();
  console.log("dasasd")
  console.log(selectEditedProduto?.id)
    // handle event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHandleEditProduto({ produtoId: selectEditedProduto?.id, nome, descricao, preco });
    setUpdateModalVisibility(!showUpdateModal);
    setNome("");
    setDescricao("");
    setPreco(0);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-black">Add Produto</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setUpdateModalVisibility(!showUpdateModal)}>
                Close
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="nome"
                    type="text"
                    placeholder="nome"
                    value={nome}
                    name="nome"
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="descricao"
                    type="text"
                    placeholder="descricao"
                    value={descricao}
                    name="descricao"
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Preço</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="preco"
                    type="text"
                    placeholder="preco"
                    value={preco}
                    name="preco"
                    onChange={(e) => setPreco(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default EditModal;