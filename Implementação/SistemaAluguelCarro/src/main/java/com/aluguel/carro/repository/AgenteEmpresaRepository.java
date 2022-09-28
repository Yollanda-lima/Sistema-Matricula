package com.aluguel.carro.repository;

import com.aluguel.carro.entity.AgenteEmpresa;
import com.aluguel.carro.entity.AgenteEmpresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgenteEmpresaRepository extends
        JpaRepository<AgenteEmpresa, Long> {

    /**
     * Encontra todos os livros de um mesmo autor.
     *
     * @param autor
     * @return lista de livros
     */
    List<AgenteEmpresa> findByNomeEmpresa(String nomeEmpresa);


}