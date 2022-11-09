import React from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { alunoProps } from "../constants/models";

interface Props {
  data: alunoProps;
  onSelectEditedAluno: (selectAluno: alunoProps) => void;
  onDeleteAluno: (id: string) => Promise<void>;
}

const StickyAluno = ({ data, onSelectEditedAluno, onDeleteAluno }: Props) => {
  const { id, nome, cpf, instituicao, aluno } = data;

  return (
    <div
      className={`w-54 h-64 flex flex-col justify-between  rounded-lg border  mb-6 py-5 px-4 -rotate-1 shadow-md`}
      style={{ backgroundColor: 'white' }}>
      <div className="">
        <div className="flex">
          <div className="w-32">
            <h4 className="text-gray-900 font-bold mb-3">{nome}</h4>
          </div>
          <div onClick={() => onDeleteAluno(id!)} className="float-right">
            <DeleteIcon className="w-8 h-8 hover:scale-125" />
          </div>
        </div>
        <p className="text-gray-800 text-sm">cpf: {cpf}</p>
        <p className="text-gray-800 text-sm">email: {aluno.email}</p>
        <p className="text-gray-800 text-sm">rg: {aluno.rg}</p>
        <p className="text-gray-800 text-sm">endereço: {aluno.endereco}</p>
        <p className="text-gray-800 text-sm">curso: {aluno.curso}</p>
        <p className="text-gray-800 text-sm">instituição: {instituicao.nome}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800">
          <button
            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black hover:scale-125"
            aria-label="edit note"
            onClick={() => onSelectEditedAluno(data)}
            role="button">
            <EditIcon className="icon icon-tabler icon-tabler-pencil hover:scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyAluno;