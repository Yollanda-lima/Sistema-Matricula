package com.aluguel.carro.dto;

import com.aluguel.carro.entity.Automovel;
import com.aluguel.carro.entity.Cliente;
import com.aluguel.carro.entity.PedidoAluguel;
import com.aluguel.carro.repository.AutomovelRepository;
import com.aluguel.carro.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.time.LocalDate;

public class PedidoAluguelDTO {
    private Long id;

    private Long clienteID;

    private Long automovelID;

    private String dataInicio;

    private String dataFim;



    public PedidoAluguelDTO(Long id, Long clienteID, Long automovelID, String dataInicio, String dataFim) {
        this.id = id;
        this.clienteID = clienteID;
        this.automovelID = automovelID;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    public PedidoAluguelDTO() {
    }

    public PedidoAluguelDTO(PedidoAluguel pedidoAluguel) {
        this.id = pedidoAluguel.getId();
        this.clienteID = pedidoAluguel.getCliente().getId();
        this.automovelID = pedidoAluguel.getAutomovel().getId();
        this.dataInicio = pedidoAluguel.getDataInicio().toString();
        this.dataFim = pedidoAluguel.getDataFim().toString();
    }

    public PedidoAluguel build() {
        PedidoAluguel pedidoAluguel = new PedidoAluguel();
        pedidoAluguel.setId(this.id);
        pedidoAluguel.setDataFim(LocalDate.parse(this.dataFim));
        pedidoAluguel.setDataInicio(LocalDate.parse(this.dataInicio));

        return pedidoAluguel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClienteID() {
        return clienteID;
    }

    public void setClienteID(Long clienteID) {
        this.clienteID = clienteID;
    }

    public Long getAutomovelID() {
        return automovelID;
    }

    public void setAutomovelID(Long automovelID) {
        this.automovelID = automovelID;
    }

    public String getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(String dataInicio) {
        this.dataInicio = dataInicio;
    }

    public String getDataFim() {
        return dataFim;
    }

    public void setDataFim(String dataFim) {
        this.dataFim = dataFim;
    }

    @Override
    public String toString() {
        return "PedidoAluguelDTO{" +
                "id=" + id +
                ", clienteID=" + clienteID +
                ", automovelID=" + automovelID +
                ", dataInicio='" + dataInicio + '\'' +
                ", dataFim='" + dataFim + '\'' +
                '}';
    }
}
