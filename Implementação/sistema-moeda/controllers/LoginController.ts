import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client 

// route for fetching all alunos
const login = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { matricula, senha } = req.body;

  const alunos = await prisma.user.findUnique({
    where: {
      matricula: matricula
    },
    include: {
      aluno: {
        include: {
          instituicao: true
        }
      }
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      alunos,
    },
  });
});

// export all routes to be used in the api/
export { login };