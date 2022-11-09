import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client 

// route for fetching all alunos
const getAllAlunos = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const alunos = await prisma.user.findMany({
    where: {
      type: "ALUNO"
    },
    include: {
      aluno: true,
      instituicao: true
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      alunos,
    },
  });
});

// route for post a aluno
const postAluno = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, nome, cpf, rg, endereco, instituicao, curso } = req.body;
  const aluno = await prisma.user.create({
    data: {
      aluno : {
        create: {
          email, rg, endereco, curso,
        }
      },
      nome,
      instituicao : {
        connect: {
          id: instituicao
        }
      },
      
      cpf,
      type: "ALUNO"
    },
  });
  res.status(200).json({
    status: "success",
    data: aluno,
  });
});

// route for deleting through a aluno id request dynamically
const deleteUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.user.delete({
    where: {
      id: id.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// get one aluno from with a aluno id request dynamically
const getUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const aluno = await prisma.user.findUnique({
    where: {
      id: id.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      aluno,
    },
  });
});

// update a aluno from with a aluno id request dynamically
const updateAluno = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { email, nome, cpf, rg, endereco, instituicao, curso } = req.body;
  const aluno = await prisma.user.update({
    where: {
      id: id.toString(),
    },
    data: {
      aluno : {
        update: {
          email, rg, endereco, curso,
        }
      },
      nome,
      cpf,
      instituicao : {
        connect: {
          id: instituicao
        }
      },
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      aluno,
    },
  });
});

// export all routes to be used in the api/
export { getAllAlunos, postAluno, deleteUser, updateAluno, getUser };