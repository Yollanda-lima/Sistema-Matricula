import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client 

// route for fetching all empresas
const getAllEmpresas = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const empresas = await prisma.user.findMany({
    where: {
      type: "EMPRESA"
    },
    include: {
      empresa: {
        include: {
          produtos: true
        }
      },
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      empresas,
    },
  });
});

// route for post a empresa
const postEmpresa = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { nome, cnpj } = req.body;
  const empresa = await prisma.user.create({
    data: {
      empresa : {
        create: {
          cnpj
        }
      },
      conta : {
        create: {
          saldo : 0
        }
      },
      nome,
      type: "EMPRESA"
    },
  });
  res.status(200).json({
    status: "success",
    data: empresa,
  });
});

// route for deleting through a empresa id request dynamically
const deleteUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.user.delete({
    where: {
      id: id?.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// get one empresa from with a empresa id request dynamically
const getUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const empresa = await prisma.user.findUnique({
    where: {
      id: id?.toString(),
    },
    include: {
      empresa: {
        include: {
          produtos: true
        }
      },
      conta: true
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      empresa,
    },
  });
});

// update a empresa from with a empresa id request dynamically
const updateEmpresa = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { nome, cnpj } = req.body;
  const empresa = await prisma.user.update({
    where: {
      id: id?.toString(),
    },
    data: {
      empresa : {
        update: {
          cnpj
        }
      },
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

// export all routes to be used in the api/
export { getAllEmpresas, postEmpresa, deleteUser, updateEmpresa, getUser };