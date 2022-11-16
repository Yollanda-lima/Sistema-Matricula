import nc from "next-connect";
// handle server error middleware
import onError from "../../../../../middlewares/errors";
// import the notes controller for postingAlunos and fetching all notes
import { getUser } from "../../../../../controllers/AlunosController";

const handler = nc({ onError });

// get a single note
handler.get(getUser);

export default handler;