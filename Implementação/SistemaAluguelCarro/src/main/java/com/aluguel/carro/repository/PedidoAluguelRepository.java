package com.aluguel.carro.repository;

import com.aluguel.carro.entity.PedidoAluguel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoAluguelRepository extends
        JpaRepository<PedidoAluguel, Long> {


}