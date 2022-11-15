import nc from "next-connect";
// handle server error middleware
import onError from "../../../../middlewares/errors";
// import the notes controller for postingAlunos and fetching all notes
import { deleteExtrato, getAllExtratos } from "../../../../controllers/ExtratosController";

const handler = nc({ onError });

// get a single note
handler.get(getAllExtratos);
// delete a single note
handler.delete(deleteExtrato);

export default handler;