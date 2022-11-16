import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client 

// route for fetching all produtos
const getAllProdutos = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const produtos = await prisma.produto.findMany();

  res.status(200).json({
    status: "success",
    data: {
      produtos,
    },
  });
});

// route for post a produto
const postProduto = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { nome, descricao, preco, empresaId } = req.body;
  const produto = await prisma.produto.create({
    data: {
      nome, descricao, preco,
      empresa: {
        connect: {
          userId: empresaId
        }
      }
    },
  });
  res.status(200).json({
    status: "success",
    data: produto,
  });
});

// update a empresa from with a empresa id request dynamically
const updateProduto = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { produtoId } = req.query;
  const { nome, descricao, preco } = req.body;
  const empresa = await prisma.produto.update({
    where: {
      id: produtoId?.toString(),
    },
    data: {
      descricao,
      preco,
      nome,

    },
  });
  res.status(200).json({
    status: "success",
    data: {
      empresa,
    },
  });
});

// route for deleting through a produto id request dynamically
const deleteProduto = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.produto.delete({
    where: {
      id: id?.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// get one produto from with a produto id request dynamically
const getProduto = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const produto = await prisma.produto.findUnique({
    where: {
      id: id?.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      produto,
    },
  });
});

// export all routes to be used in the api/
export { getAllProdutos, postProduto, deleteProduto, updateProduto, getProduto };