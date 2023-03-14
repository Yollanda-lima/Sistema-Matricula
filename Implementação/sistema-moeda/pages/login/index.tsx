import { NextPage } from "next";
import Head from "next/head";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import {useState } from "react";
import absoluteUrl from "next-absolute-url";

const Login = () => {
  const state = {
    error: "",
  };
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useRouter();
  const handleSignIn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!matricula || !senha) {
      state.error = "Preencha a matrícula e senha para continuar!";
    } else {
      try {
        const response = await axios.post(`localhost:3000/api/login`, { matricula, senha });
        navigate.push("/dashboard");
      } catch (err) {
        state.error =
          "Houve um problema com o login, verifique suas credenciais. T.T";
      }
    }
  };
  return (
    <div style={{backgroundColor: 'white'}}>
      <Head>
        <title>Sistema de Moedas</title>
        <meta name="description" title="This is all about takings aluno" />
        <link rel="icon" href="/site_logo.ico" />
      </Head>

      <div
      style={{
        height: "100vh",
        boxShadow: "3px 3px red, -1em 0 0.4em olive",
        opacity: "0.9",
      }}
    >
      <form onSubmit={handleSignIn}>
        <h1 style={{ margin: 10 }}>Entrar</h1>
        <hr />

        {state.error && <p>{state.error}</p>}
        <p
          id="show-me"
          style={{ display: "none", transition: "display 0.2s ease" }}
        >
          Carregando...
        </p>
        <TextField
          required
          style={{ margin: 10 }}
          type="number"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <TextField
          required
          style={{ margin: 10 }}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <hr />

        <Button color="success" variant="contained" type="submit">
          Entrar
        </Button>
      </form>
    </div>
    </div>
  );
};

export default Login;