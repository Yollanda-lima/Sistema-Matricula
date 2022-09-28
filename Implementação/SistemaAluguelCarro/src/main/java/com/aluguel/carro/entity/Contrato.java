package com.aluguel.carro.entity;

import javax.persistence.*;

@Entity
public class Contrato {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pedido_aluguel_id", referencedColumnName = "id")
    private PedidoAluguel pedidoAluguel;

    @Column(name="contratoCredito", nullable=false)
    private boolean contratoCredito;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "agente_financeiro_id", referencedColumnName = "id")
    private AgenteFinanceiro agenteFinanceiro;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PedidoAluguel getPedidoAluguel() {
        return pedidoAluguel;
    }

    public void setPedidoAluguel(PedidoAluguel pedidoAluguel) {
        this.pedidoAluguel = pedidoAluguel;
    }

    public boolean isContratoCredito() {
        return contratoCredito;
    }

    public void setContratoCredito(boolean contratoCredito) {
        this.contratoCredito = contratoCredito;
    }

    public AgenteFinanceiro getAgenteFinanceiro() {
        return agenteFinanceiro;
    }

    public void setAgenteFinanceiro(AgenteFinanceiro agenteFinanceiro) {
        this.agenteFinanceiro = agenteFinanceiro;
    }
}
