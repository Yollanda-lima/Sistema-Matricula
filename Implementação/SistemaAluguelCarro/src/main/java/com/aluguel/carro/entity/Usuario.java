package com.aluguel.carro.entity;

import javax.persistence.*;

@MappedSuperclass
public abstract class Usuario {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    protected Long id;

    @Column(name="nomeUsuario", nullable=false)
    protected String nomeUsuario;
    @Column(name="senha", nullable=false)
    protected String senha;
    @Column(name="nomeCompleto", nullable=false)
    protected String nomeCompleto;
    @Column(name="cpf", nullable=false)
    protected int cpf;
    @Column(name="endereco", nullable=false)
    protected String endereco;

    public Usuario(Long id, String nomeUsuario, String senha, String nomeCompleto, int cpf, String endereco) {
        this.id = id;
        this.nomeUsuario = nomeUsuario;
        this.senha = senha;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.endereco = endereco;
    }

    public Usuario() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public int getCpf() {
        return cpf;
    }

    public void setCpf(int cpf) {
        this.cpf = cpf;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nomeUsuario='" + nomeUsuario + '\'' +
                ", senha='" + senha + '\'' +
                ", nomeCompleto='" + nomeCompleto + '\'' +
                ", cpf=" + cpf +
                ", endereco='" + endereco + '\'' +
                '}';
    }
}
