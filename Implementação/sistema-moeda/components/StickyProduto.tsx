import React from "react";
import { produtoProps } from "../constants/models";

interface Props {
  data: produtoProps;
}

const StickyProduto = ({ data }: Props) => {
  const {nome, descricao, preco } = data;


  return (
    <div
      className={`w-54 flex flex-col justify-between  rounded-lg border  mb-6 py-5 px-4 -rotate-1 shadow-md`}
      style={{ backgroundColor: 'white' }}>
      <div className="">
        <div className="flex">
          <div >
            <h4 className="text-gray-900 font-bold mb-3">{nome}</h4>
          </div>

        </div>
        <p className="text-gray-800 text-sm">Descricao: {descricao}</p>
        <p className="text-gray-800 text-sm">Preço: {preco}</p>

      </div>

      <div>

      </div>
    </div>
  );
};

export default StickyProduto;