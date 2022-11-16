import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client 

// route for fetching all instituicoes
const getAllInstituicoes = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const instituicoes = await prisma.instituicao.findMany();

  res.status(200).json({
    status: "success",
    data: {
      instituicoes,
    },
  });
});

// route for post a instituicao
const postInstituicao = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { nome } = req.body;
  const instituicao = await prisma.instituicao.create({
    data: {
      nome
    },
  });
  res.status(200).json({
    status: "success",
    data: instituicao,
  });
});

// route for deleting through a instituicao id request dynamically
const deleteInstituicao = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.instituicao.delete({
    where: {
      id: id?.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// get one instituicao from with a instituicao id request dynamically
const getInstituicao = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const instituicao = await prisma.instituicao.findUnique({
    where: {
      id: id?.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      instituicao,
    },
  });
});

// export all routes to be used in the api/
export { getAllInstituicoes, postInstituicao, deleteInstituicao, getInstituicao };