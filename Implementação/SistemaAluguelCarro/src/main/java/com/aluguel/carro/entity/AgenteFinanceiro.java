package com.aluguel.carro.entity;

import javax.persistence.*;

@Entity
public class AgenteFinanceiro extends Usuario {
    public AgenteFinanceiro(Long id, String nomeUsuario, String senha, String nomeCompleto, int cpf, String endereco, String nomeEmpresa) {
        super(id, nomeUsuario, senha, nomeCompleto, cpf, endereco);
        this.nomeEmpresa = nomeEmpresa;
    }

    public AgenteFinanceiro() {
    }

    @Column(name="nomeEmpresa", nullable=false)
    private String nomeEmpresa;

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }
}
