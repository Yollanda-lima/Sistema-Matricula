import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client

// route for fetching all extratos
const getAllExtratos = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;
    const extrato = await prisma.notaFiscal.findMany({
      where: {
        OR: [
          {
            AND : [
              {
                contaOrigem: {
                  users: {
                    some: {
                      id: userId as string,
                    }
                  },
                  
                },
              
              },
              {
                tipo: "TRANSFERENCIA",
              }
            ]
          },
          {
            AND : [
              {
                contaDestino: {
                  users: {
                    some: {
                      id: userId as string,
                    }
                  }
                }
              },
              {
                tipo: "DEPOSITO",
              }
            ]
          }
        ]

      },
      include: {
        contaOrigem: {
          include: {
            users: true
          }
        },
        contaDestino: {
          include: {
            users: true
          }
        },

      }
    });


    res.status(200).json({
      status: "success",
      data: {
        extrato,
      },
    });
  }
);

// route for deleting through a extrato id request dynamically
const deleteExtrato = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    await prisma.notaFiscal.delete({
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

// get one extrato from with a extrato id request dynamically
const getExtrato = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;
    const extrato = await prisma.notaFiscal.findFirst({
      where: {
        
        id: userId?.toString(),
      },

    });

    res.status(200).json({
      status: "success",
      data: {
        extrato,
      },
    });
  }
);


// export all routes to be used in the api/
export {
  getAllExtratos,
  deleteExtrato,
  getExtrato,
};
