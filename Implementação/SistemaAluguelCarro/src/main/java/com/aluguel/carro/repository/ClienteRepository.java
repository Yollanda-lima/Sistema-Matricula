package com.aluguel.carro.repository;

import com.aluguel.carro.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteRepository extends
        JpaRepository<Cliente, Long> {

    /**
     * Encontra todos os livros de um mesmo autor.
     *
     * @param autor
     * @return lista de livros
     */
    List<Cliente> findByNome(String nome);


}