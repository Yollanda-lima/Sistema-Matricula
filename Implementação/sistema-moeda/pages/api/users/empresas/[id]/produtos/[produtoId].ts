import nc from "next-connect";
// handle server error middleware
import onError from "../../../../../../middlewares/errors";
// import the notes controller for postingAlunos and fetching all notes
import { updateProduto, deleteProduto, getProduto } from "../../../../../../controllers/ProdutosController";

const handler = nc({ onError });

// get a single note
handler.get(getProduto);
// update a single note
handler.put(updateProduto);
// delete a single note
handler.delete(deleteProduto);

export default handler;