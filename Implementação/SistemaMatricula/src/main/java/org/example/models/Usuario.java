package org.example.models;

public abstract class Usuario {

    private int id;
    private static int ultimoCodigo=0;
    private String nome;
    private String email;
    private String senha;

    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public static void setProximoCodigo(int cod){
        if(ultimoCodigo<=cod)
            ultimoCodigo = cod+1;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }


    /**
     * Método que valida o login de aluno e professor
     * @param nome
     * @param senha
     * @return
     */
    public boolean fazerLogin(String nome, String senha) {
        return false;
    }
}
