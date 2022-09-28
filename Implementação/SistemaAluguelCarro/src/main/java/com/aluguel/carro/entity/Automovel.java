package com.aluguel.carro.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Automovel {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name="matricula", nullable=false)
    private String matricula;

    @Column(name="ano", nullable=false)
    private int ano;

    @Column(name="marca", nullable=false)
    private String marca;

    @Column(name="modelo", nullable=false)
    private String modelo;

    @Column(name="placa", nullable=false)
    private String placa;

    @Column(name="ehProprietario",nullable=false)
    private boolean ehProprietario;

    @OneToMany(mappedBy = "automovel")
    private List<PedidoAluguel> pedidosAlugueis;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public boolean isEhProprietario() {
        return ehProprietario;
    }

    public void setEhProprietario(boolean ehProprietario) {
        this.ehProprietario = ehProprietario;
    }

    public List<PedidoAluguel> getPedidosAlugueis() {
        return pedidosAlugueis;
    }

    public void setPedidosAlugueis(List<PedidoAluguel> pedidosAlugueis) {
        this.pedidosAlugueis = pedidosAlugueis;
    }
}
