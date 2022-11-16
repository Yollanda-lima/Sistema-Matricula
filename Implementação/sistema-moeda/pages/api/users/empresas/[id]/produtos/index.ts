import nc from "next-connect";
// handle server error middleware
import onError from "../../../../../../middlewares/errors";
// import the notes controller for postingAlunos and fetching all notes
import { postProduto, getAllProdutos } from "../../../../../../controllers/ProdutosController";

// initiate next-connect with error middleware
const handler = nc({ onError });

// handler request from "api/notes" endpoint
// handle post request for posting a note
handler.get(getAllProdutos);
// handle post request for posting a note
handler.post(postProduto);

export default handler;