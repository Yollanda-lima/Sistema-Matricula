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

const StickyContaAluno = ({ data }: Props) => {
  const { id, nome, cpf, aluno } = data;
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [value, setValue] = useState<number>();
  const router = useRouter();

  const handleSendMoney = async () => {
    const professorId = router.query.id;
    const { data } = await axios.patch(`/api/users/professores/${professorId}/enviarMoeda`, {
      valor: value, alunoId: id
    });

  };


  return (
    <div
      className={`w-54 h-64 flex flex-col justify-between  rounded-lg border  mb-6 py-5 px-4 -rotate-1 shadow-md`}
      style={{ backgroundColor: 'white' }}>
      <div className="">
        <div className="flex">
          <div className="w-32">
            <h4 className="text-gray-900 font-bold mb-3">{nome}</h4>
          </div>

        </div>
        <p className="text-gray-800 text-sm">Saldo: {data.conta?.saldo}</p>
        <p className="text-gray-800 text-sm">CPF: {cpf}</p>
      </div>
      <div>
        <div className="flex">
          <div className="flex items-center justify-between text-gray-800">
            <TextField style={{ margin: 5 }} id="outlined-basic" type={"number"} label="Valor" variant="outlined" defaultValue={value} onChange={(e) => setValue(Number(e.target.value))} />
            <Button
              className="text-green-500"
              onClick={(e) => handleSendMoney()}
              endIcon={<PaidIcon />}
              variant="outlined"
              color="success">
              Pagar
            </Button>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default StickyContaAluno;