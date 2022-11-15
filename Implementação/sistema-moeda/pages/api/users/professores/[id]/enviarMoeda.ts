import nc from "next-connect";
// handle server error middleware
import onError from "../../../../../middlewares/errors";
// import the notes controller for postingProfessores and fetching all notes
import { sendMoneyToAluno, deleteUser, getUser } from "../../../../../controllers/ProfessoresController";

const handler = nc({ onError });

// update a single note
handler.patch(sendMoneyToAluno);

export default handler;