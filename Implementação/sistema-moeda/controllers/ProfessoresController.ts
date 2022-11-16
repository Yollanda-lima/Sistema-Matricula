import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client

// route for fetching all professores
const getAllProfessores = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const professores = await prisma.user.findMany({
      where: {
        type: "PROFESSOR",
      },
      include: {
        professor: {
          include: {
            instituicao: true,
          }
        },
        
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        professores,
      },
    });
  }
);

const sendMoneyToAluno = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { valor } = req.body;
    const { alunoId } = req.body;
    const aluno = await prisma.user.findUnique({
      where: {
        id: alunoId as string,
      },
      include: {
        conta: true,
      },
    });
    const professor = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      include: {
        conta: true,
      },
    });
    if (aluno) {
      if (professor && professor.conta.saldo >= valor) {
        const contaAluno = await prisma.conta.update({
          where: {
            id: aluno.conta.id,
          },
          data: {
            saldo: {
              increment: valor,
            },
            notasFiscaisDestino : {
              create: {
                valor,
                tipo: "DEPOSITO",
                data: new Date(),
                contaOrigem: {
                  connect: {
                    id: professor.conta.id,
                  }
                }
              }
            },
          },

        });
        const contaProfessor = await prisma.conta.update({
          where: {
            id: professor.conta.id,
          },
          data: {
            saldo: {
              decrement: valor,
            },
            notasFiscaisOrigem : {
              create: {
                valor,
                tipo: "TRANSFERENCIA",
                data: new Date(),
                contaDestino: {
                  connect: {
                    id: aluno.conta.id,
                  }
                }
              }
            },
          },
        });

        res.status(200).json({
          status: "success",
          data: contaAluno,
        });
      }
    } else {
      res.status(404).json({
        status: "error",
        message: "Aluno não encontrado",
      });
    }
  }
);

// route for post a professor
const postProfessor = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { nome, cpf, instituicaoId, departamento } = req.body;
    const professor = await prisma.user.create({
      data: {
        professor: {
          create: {
            cpf,
            departamento,
            instituicao: {
              connect: {
                id: instituicaoId,
              },
            },
          },
        },
        conta: {
          create: {
            saldo: 0,
          },
        },
        nome,
        type: "PROFESSOR",
      },
    });
    res.status(200).json({
      status: "success",
      data: professor,
    });
  }
);

// route for deleting through a professor id request dynamically
const deleteUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
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
  }
);

// get one professor from with a professor id request dynamically
const getUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const professor = await prisma.user.findUnique({
      where: {
        id: id?.toString(),
      },
      include: {
        professor: {
          include: {
            instituicao: {
              include: {
                alunos: {
                  include: {
                    user: {
                      include: {
                        conta: true,
                      },
                    }
                  }
                }
              }
            }
          }
        },
        
        conta: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        professor,
      },
    });
  }
);

// update a professor from with a professor id request dynamically
const updateProfessor = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { nome, cpf, instituicaoId, departamento } = req.body;
    const professor = await prisma.user.update({
      where: {
        id: id?.toString(),
      },
      data: {
        professor: {
          update: {
            departamento, cpf,
            instituicao: {
              connect: {
                id: instituicaoId,
              },
            },
          },
        },
        nome,
        
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        professor,
      },
    });
  }
);

// export all routes to be used in the api/
export {
  getAllProfessores,
  postProfessor,
  deleteUser,
  updateProfessor,
  getUser,
  sendMoneyToAluno,
};
