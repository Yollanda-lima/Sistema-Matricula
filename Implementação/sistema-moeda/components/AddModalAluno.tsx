import React, { useState } from "react";
import { alunoProps, instituicaoProps } from "../constants/models";

type Props = {
  onHandleAddAluno: (aluno: alunoProps) => void;
  showAddModal: boolean;
  setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  instituicoes: instituicaoProps[];
};

const AddModal = ({ onHandleAddAluno, showAddModal, setAddModalVisibility, instituicoes }: Props) => {
  // handle field data 
  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [instituicaoId, setInstituicaoId] = useState<string | undefined>(instituicoes[0].id);
  const [curso, setCurso] = useState<string>("");

  // handle on submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHandleAddAluno({ email, nome, cpf, rg, endereco, instituicaoId, curso });
    setEmail("");
    setNome("");
    setAddModalVisibility(!showAddModal);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-black">Add Aluno</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setAddModalVisibility(!showAddModal)}>
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">CPF</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="cpf"
                    type="text"
                    placeholder="cpf"
                    value={cpf}
                    name="cpf"
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">RG</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="rg"
                    type="text"
                    placeholder="rg"
                    value={rg}
                    name="rg"
                    onChange={(e) => setRg(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">E-Mail</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Endereço</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="endereco"
                    type="text"
                    placeholder="endereco"
                    value={endereco}
                    name="endereco"
                    onChange={(e) => setEndereco(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">

                  <label htmlFor="instituicao" className="block text-gray-700 text-sm font-bold mb-2">instituição:</label>
                  <select id="instituicao" value={instituicaoId} onChange={(e) => setInstituicaoId(e.target.value)} name="instituicao" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                    {instituicoes && instituicoes.map((inst: instituicaoProps) => (
                      <option key={inst.id} value={inst.id}>{inst.nome}</option>
                    ))}
                    
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Curso</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="curso"
                    type="text"
                    placeholder="curso"
                    value={curso}
                    name="curso"
                    onChange={(e) => setCurso(e.target.value)}
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

export default AddModal;