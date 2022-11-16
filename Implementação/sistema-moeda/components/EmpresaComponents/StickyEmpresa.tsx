import React from "react";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { empresaProps } from "../../constants/models";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ProdutoDashboard from "../ProdutoComponents/ProdutoDashboard";

interface Props {
  data: empresaProps;
  onSelectEditedEmpresa: (selectEmpresa: empresaProps) => void;
  onSelectAccountEmpresa: (selectEmpresa: empresaProps) => void;
  onDeleteEmpresa: (id: string) => Promise<void>;
}

const StickyEmpresa = ({ data, onSelectEditedEmpresa, onDeleteEmpresa, onSelectAccountEmpresa }: Props) => {
  const { id, nome, empresa } = data;

  return (
    <div
      className={`w-54 h-64 flex flex-col justify-between  rounded-lg border  mb-6 py-5 px-4 -rotate-1 shadow-md`}
      style={{ backgroundColor: 'white' }}>
      <div className="">
        <div className="flex">
          <div className="w-32">
            <h4 className="text-gray-900 font-bold mb-3">{nome}</h4>
          </div>
          <div onClick={() => onDeleteEmpresa(id!)} className="float-right">
            <DeleteIcon className="w-8 h-8 hover:scale-125" />
          </div>
        </div>
        <p className="text-gray-800 text-sm">cnpj: {empresa?.cnpj}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800">
          <button
            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black hover:scale-125"
            aria-label="edit note"
            onClick={() => onSelectEditedEmpresa(data)}
            role="button">
            <EditIcon className="icon icon-tabler icon-tabler-pencil hover:scale-125" />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black hover:scale-125"
            aria-label="edit note"
            onClick={() => onSelectAccountEmpresa(data)}
            role="button">
            <AccountBoxIcon className="icon icon-tabler icon-tabler-pencil hover:scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyEmpresa;