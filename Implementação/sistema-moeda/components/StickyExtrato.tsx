import React from "react";
import { notaFiscalProps } from "../constants/models";

interface Props {
  data: notaFiscalProps;
}

const StickyExtrato = ({ data }: Props) => {
  const { id, valor, contaDestino, contaOrigem, tipo } = data;


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
        <p className="text-gray-800 text-sm">Tipo: {tipo}</p>
        <p className="text-gray-800 text-sm">Conta de Destino: {contaDestino.users[0].nome}</p>
        <p className="text-gray-800 text-sm">Data: {data.data.split('T')[0]}</p>
        <p className="text-gray-800 text-sm">Hora: {data.data.split('T')[1]}</p>

      </div>

      <div>

      </div>
    </div>
  );
};

export default StickyExtrato;