package com.aluguel.carro.controller;

import com.aluguel.carro.entity.Cliente;
import com.aluguel.carro.entity.Livro;
import com.aluguel.carro.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;


    @RequestMapping(value = "/cadastrar", method = RequestMethod.GET)
    public String cadastroCliente() {
        return "cadastroCliente";
    }

    @RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
    public String cadastrarClienteNoSistema(Cliente cliente) {
        System.out.println(cliente);
        clienteRepository.save(cliente);
        return "redirect:/{cliente.getId()}";
    }

}
