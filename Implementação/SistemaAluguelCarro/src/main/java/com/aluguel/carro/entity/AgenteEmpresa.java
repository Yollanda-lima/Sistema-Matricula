package com.aluguel.carro.entity;

import javax.persistence.*;

@Entity
public class AgenteEmpresa extends Usuario {

    @Column(name = "nomeEmpresa", nullable = false)
    private String nomeEmpresa;

    public AgenteEmpresa(Long id, String nomeUsuario, String senha, String nomeCompleto, int cpf, String endereco, String nomeEmpresa) {
        super(id, nomeUsuario, senha, nomeCompleto, cpf, endereco);
        this.nomeEmpresa = nomeEmpresa;
    }

    public AgenteEmpresa() {
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }
}
