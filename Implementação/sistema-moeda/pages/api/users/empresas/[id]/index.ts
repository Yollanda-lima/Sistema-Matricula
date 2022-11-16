import nc from "next-connect";
// handle server error middleware
import onError from "../../../../../middlewares/errors";
// import the notes controller for postingEmpresas and fetching all notes
import { updateEmpresa, deleteUser, getUser } from "../../../../../controllers/EmpresasController";

const handler = nc({ onError });

// get a single note
handler.get(getUser);
// update a single note
handler.put(updateEmpresa);
// delete a single note
handler.delete(deleteUser);

export default handler;