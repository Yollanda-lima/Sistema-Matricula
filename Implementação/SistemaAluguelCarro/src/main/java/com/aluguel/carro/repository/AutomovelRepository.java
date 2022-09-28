package com.aluguel.carro.repository;

import com.aluguel.carro.entity.Automovel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AutomovelRepository extends
        JpaRepository<Automovel, Long> {


}