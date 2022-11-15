import React from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { alunoProps } from "../constants/models";
import PaidIcon from '@mui/icons-material/Paid';
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
  data: alunoProps;
}

const StickyExtrato = ({ data }: Props) => {
  const { id, valor, contaDestino, contaOrigem } = data;


  return (
    <div
      className={`w-54 flex flex-col justify-between  rounded-lg border  mb-6 py-5 px-4 -rotate-1 shadow-md`}
      style={{ backgroundColor: 'white' }}>
      <div className="">
        <div className="flex">
          <div >
            <h4 className="text-gray-900 font-bold mb-3">Valor: {valor} moeda(s)</h4>
          </div>

        </div>
        <p className="text-gray-800 text-sm">Conta de Origem: {contaOrigem.users[0].nome}</p>
        <p className="text-gray-800 text-sm">Conta de Destino: {contaDestino.users[0].nome}</p>
        <p className="text-gray-800 text-sm">Data: {data.data.split('T')[0]}</p>
        <p className="text-gray-800 text-sm">Hora: {data.data.split('T')[1]}</p>
        {/* <p className="text-gray-800 text-sm">email: {aluno?.email}</p>
        <p className="text-gray-800 text-sm">rg: {aluno?.rg}</p>
        <p className="text-gray-800 text-sm">endereço: {aluno?.endereco}</p>
        <p className="text-gray-800 text-sm">curso: {aluno?.curso}</p> */}
      </div>

      <div>

      </div>
    </div>
  );
};

export default StickyExtrato;