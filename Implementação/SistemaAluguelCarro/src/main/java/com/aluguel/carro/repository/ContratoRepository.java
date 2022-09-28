package com.aluguel.carro.repository;

import com.aluguel.carro.entity.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContratoRepository extends
        JpaRepository<Contrato, Long> {



}