import nc from "next-connect";
// handle server error middleware
import onError from "../../../../../middlewares/errors";
// import the notes controller for postingProfessores and fetching all notes
import { updateProfessor, deleteUser, getUser } from "../../../../../controllers/ProfessoresController";

const handler = nc({ onError });

// get a single note
handler.get(getUser);
// update a single note
handler.put(updateProfessor);
// delete a single note
handler.delete(deleteUser);

export default handler;