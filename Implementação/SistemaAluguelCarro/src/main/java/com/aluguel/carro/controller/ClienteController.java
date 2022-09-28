package com.aluguel.carro.controller;

import com.aluguel.carro.entity.Cliente;
import com.aluguel.carro.entity.Cliente;
import com.aluguel.carro.entity.Livro;
import com.aluguel.carro.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;

    @RequestMapping(value = "/cadastrar", method = RequestMethod.GET)
    public String cadastroCliente() {
        return "clientes/cadastroCliente";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.GET)
    public String atualizacaoCliente(@PathVariable("id") Long id, Model model) {
        Cliente cliente = clienteRepository.getReferenceById(id);
        System.out.println(cliente.getId());
        model.addAttribute("cliente", cliente);
        return "clientes/atualizarCliente";
    }

    @RequestMapping(value = "/ver/{id}", method = RequestMethod.GET)
    public String verCliente(@PathVariable("id") Long id, Model model) {
        Cliente cliente = clienteRepository.getReferenceById(id);
        model.addAttribute("cliente", cliente);
        return "clientes/verCliente";
    }

    @RequestMapping(value = "/visualizarTodos", method = RequestMethod.GET)
    public String visualizarClientes(Model model) {
        List<Cliente> listaClientes = clienteRepository.findAll();
        if (!listaClientes.isEmpty()) {
            model.addAttribute("clientes", listaClientes);
        }
        return "clientes/visualizarClientes";
    }

    @RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
    public String cadastrarClienteNoSistema(Cliente cliente) {
        clienteRepository.save(cliente);

        return "redirect:/cliente/visualizarTodos";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.POST)
    public String AtualizarClienteNoSistema(Cliente cliente, @PathVariable("id") Long id) {
        System.out.println(id);
        clienteRepository.save(cliente);
        return "redirect:/cliente/visualizarTodos";
    }

    @RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE)
    public ModelAndView AtualizarClienteNoSistema(@PathVariable("id") Long id) {
        Cliente cliente = clienteRepository.getReferenceById(id);
        clienteRepository.delete(cliente);
        return new ModelAndView("redirect:/cliente/visualizarTodos");
    }

}
