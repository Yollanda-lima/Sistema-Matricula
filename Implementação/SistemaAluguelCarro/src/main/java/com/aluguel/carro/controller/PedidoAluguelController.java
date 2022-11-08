package com.aluguel.carro.controller;

import com.aluguel.carro.dto.PedidoAluguelDTO;
import com.aluguel.carro.entity.Automovel;
import com.aluguel.carro.entity.Cliente;
import com.aluguel.carro.entity.PedidoAluguel;
import com.aluguel.carro.repository.AutomovelRepository;
import com.aluguel.carro.repository.ClienteRepository;
import com.aluguel.carro.repository.PedidoAluguelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/pedidoAluguel")
public class PedidoAluguelController {
    @Autowired
    private PedidoAluguelRepository pedidoAluguelRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private AutomovelRepository automovelRepository;

    @RequestMapping(value = "/cadastrar", method = RequestMethod.GET)
    public String cadastroPedidoAluguel() {
        return "pedidosAluguel/cadastroPedidoAluguel";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.GET)
    public String atualizacaoPedidoAluguel(@PathVariable("id") Long id, Model model) {
        PedidoAluguelDTO pedidoAluguelDTO = new PedidoAluguelDTO(pedidoAluguelRepository.getReferenceById(id));
        System.out.println(pedidoAluguelDTO.getId());
        model.addAttribute("pedidoAluguel", pedidoAluguelDTO);
        return "pedidosAluguel/atualizarPedidoAluguel";
    }

    @RequestMapping(value = "/ver/{id}", method = RequestMethod.GET)
    public String verPedidoAluguel(@PathVariable("id") Long id, Model model) {
        PedidoAluguelDTO pedidoAluguel = new PedidoAluguelDTO(pedidoAluguelRepository.getReferenceById(id));
        model.addAttribute("pedidoAluguel", pedidoAluguel);
        return "pedidosAluguel/verPedidoAluguel";
    }

    @RequestMapping(value = "/visualizarTodos", method = RequestMethod.GET)
    public String visualizarPedidosAluguel(Model model) {
        List<PedidoAluguelDTO> listaPedidosAluguel = pedidoAluguelRepository.findAll().stream().map(PedidoAluguelDTO::new).collect(Collectors.toList());
        if (!listaPedidosAluguel.isEmpty()) {
            model.addAttribute("pedidosAluguel", listaPedidosAluguel);
        }
        return "pedidosAluguel/visualizarPedidosAluguel";
    }

    @RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
    public String cadastrarPedidoAluguelNoSistema(PedidoAluguelDTO pedidoAluguelDTO) {
        System.out.println(pedidoAluguelDTO.getDataInicio());
        PedidoAluguel pedidoAluguel = pedidoAluguelDTO.build();
        Cliente cliente = clienteRepository.getReferenceById(pedidoAluguelDTO.getClienteID());
        Automovel automovel = automovelRepository.getReferenceById(pedidoAluguelDTO.getAutomovelID());

        pedidoAluguel.setCliente(cliente);
        pedidoAluguel.setAutomovel(automovel);

        cliente.getPedidosAlugueis().add(pedidoAluguel);

        clienteRepository.save(cliente);

        pedidoAluguelRepository.save(pedidoAluguel);

        return "redirect:/pedidoAluguel/visualizarTodos";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.POST)
    public String AtualizarPedidoAluguelNoSistema(PedidoAluguelDTO pedidoAluguelDTO, @PathVariable("id") Long id) {
        PedidoAluguel pedidoAluguel = pedidoAluguelDTO.build();
        Cliente cliente = clienteRepository.getReferenceById(pedidoAluguelDTO.getClienteID());
        Automovel automovel = automovelRepository.getReferenceById(pedidoAluguelDTO.getAutomovelID());

        pedidoAluguel.setCliente(cliente);
        pedidoAluguel.setAutomovel(automovel);

        cliente.getPedidosAlugueis().add(pedidoAluguel);

        clienteRepository.save(cliente);

        pedidoAluguelRepository.save(pedidoAluguel);
        pedidoAluguelRepository.save(pedidoAluguel);
        return "redirect:/pedidoAluguel/visualizarTodos";
    }

    @RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE)
    public ModelAndView AtualizarPedidoAluguelNoSistema(@PathVariable("id") Long id) {
        PedidoAluguel pedidoAluguel = pedidoAluguelRepository.getReferenceById(id);
        pedidoAluguelRepository.delete(pedidoAluguel);
        return new ModelAndView("redirect:/pedidoAluguel/visualizarTodos");
    }

}
