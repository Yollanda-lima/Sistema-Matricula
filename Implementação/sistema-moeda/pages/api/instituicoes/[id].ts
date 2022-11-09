import nc from "next-connect";
// handle server error middleware
import onError from "../../../middlewares/errors";
// import the notes controller for postingAlunos and fetching all notes
import { updateInstituicao, deleteInstituicao, getInstituicao } from "../../../controllers/InstituicoesController";

const handler = nc({ onError });

// get a single note
handler.get(getInstituicao);
// update a single note
handler.put(updateInstituicao);
// delete a single note
handler.delete(deleteInstituicao);

export default handler;