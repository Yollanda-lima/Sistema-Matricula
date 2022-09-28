package com.aluguel.carro.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Cliente extends Usuario {

    public Cliente(Long id, String nomeUsuario, String senha, String nomeCompleto, int cpf, String endereco, String rg, String profissao, List<PedidoAluguel> pedidosAlugueis) {
        super(id, nomeUsuario, senha, nomeCompleto, cpf, endereco);
        this.rg = rg;
        this.profissao = profissao;
        this.pedidosAlugueis = pedidosAlugueis;
    }

    public Cliente(Long id, String nomeUsuario, String senha, String nomeCompleto, int cpf, String endereco) {
        super(id, nomeUsuario, senha, nomeCompleto, cpf, endereco);
    }

    public Cliente() {
        super();
    }

    @Column(name="rg", nullable=false)
    private String rg;

    @Column(name="profissao", nullable=false)
    private String profissao;

    @OneToMany(mappedBy = "cliente")
    private List<PedidoAluguel> pedidosAlugueis;

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public List<PedidoAluguel> getPedidosAlugueis() {
        return pedidosAlugueis;
    }

    public void setPedidosAlugueis(List<PedidoAluguel> pedidosAlugueis) {
        this.pedidosAlugueis = pedidosAlugueis;
    }
}
