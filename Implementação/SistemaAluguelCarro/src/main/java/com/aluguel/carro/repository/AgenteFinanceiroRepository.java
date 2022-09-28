package com.aluguel.carro.repository;

import com.aluguel.carro.entity.AgenteFinanceiro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgenteFinanceiroRepository extends
        JpaRepository<AgenteFinanceiro, Long> {

    /**
     * Encontra todos os livros de um mesmo autor.
     *
     * @param autor
     * @return lista de livros
     */
    List<AgenteFinanceiro> findByNomeEmpresa(String nomeEmpresa);


}