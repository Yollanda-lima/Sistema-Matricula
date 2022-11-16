import nc from "next-connect";
// handle server error middleware
import onError from "../../../../../middlewares/errors";
// import the notes controller for postingAlunos and fetching all notes
import { updateAluno, deleteUser, getUser } from "../../../../../controllers/AlunosController";

const handler = nc({ onError });

// get a single note
handler.get(getUser);
// update a single note
handler.put(updateAluno);
// delete a single note
handler.delete(deleteUser);

export default handler;