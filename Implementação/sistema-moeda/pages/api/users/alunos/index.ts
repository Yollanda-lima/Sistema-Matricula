import nc from "next-connect";
// handle server error middleware
import onError from "../../../../middlewares/errors";
// import the notes controller for postingAlunos and fetching all notes
import { postAluno, getAllAlunos } from "../../../../controllers/AlunosController";

// initiate next-connect with error middleware
const handler = nc({ onError });

// handler request from "api/notes" endpoint
// handle post request for posting a note
handler.get(getAllAlunos);
// handle post request for posting a note
handler.post(postAluno);

export default handler;