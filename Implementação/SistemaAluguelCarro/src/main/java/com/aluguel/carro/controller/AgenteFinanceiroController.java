package com.aluguel.carro.controller;

import com.aluguel.carro.entity.AgenteFinanceiro;
import com.aluguel.carro.entity.Cliente;
import com.aluguel.carro.repository.AgenteFinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/agenteFinanceiro")
public class AgenteFinanceiroController {
    @Autowired
    private AgenteFinanceiroRepository agenteFinanceiroRepository;


    @RequestMapping(value = "/cadastrar", method = RequestMethod.GET)
    public String cadastroAgenteFinanceiro() {
        return "agentesFinanceiro/cadastroAgenteFinanceiro";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.GET)
    public String atualizacaoAgenteFinanceiro(@PathVariable("id") Long id, Model model) {
        AgenteFinanceiro agenteFinanceiro = agenteFinanceiroRepository.getReferenceById(id);
        System.out.println(agenteFinanceiro.getId());
        model.addAttribute("agenteFinanceiro", agenteFinanceiro);
        return "agentesFinanceiro/atualizarAgenteFinanceiro";
    }

    @RequestMapping(value = "/ver/{id}", method = RequestMethod.GET)
    public String verAgenteFinanceiro(@PathVariable("id") Long id, Model model) {
        AgenteFinanceiro agenteFinanceiro = agenteFinanceiroRepository.getReferenceById(id);
        model.addAttribute("agenteFinanceiro", agenteFinanceiro);
        return "agentesFinanceiro/verAgenteFinanceiro";
    }

    @RequestMapping(value = "/visualizarTodos", method = RequestMethod.GET)
    public String visualizarAgentesFinanceiros(Model model) {
        List<AgenteFinanceiro> listaAgentesFinanceiros = agenteFinanceiroRepository.findAll();
        if (!listaAgentesFinanceiros.isEmpty()) {
            model.addAttribute("agentesFinanceiros", listaAgentesFinanceiros);
        }
        return "agentesFinanceiro/visualizarAgentesFinanceiro";
    }

    @RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
    public String cadastrarAgenteFinanceiroNoSistema(AgenteFinanceiro agenteFinanceiro) {
        agenteFinanceiroRepository.save(agenteFinanceiro);

        return "redirect:/agenteFinanceiro/visualizarTodos";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.POST)
    public String AtualizarAgenteFinanceiroNoSistema(AgenteFinanceiro agenteFinanceiro, @PathVariable("id") Long id) {
        System.out.println(id);
        agenteFinanceiroRepository.save(agenteFinanceiro);
        return "redirect:/agenteFinanceiro/visualizarTodos";
    }

    @RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE)
    public ModelAndView AtualizarAgenteFinanceiroNoSistema(@PathVariable("id") Long id) {
        AgenteFinanceiro agenteFinanceiro = agenteFinanceiroRepository.getReferenceById(id);
        agenteFinanceiroRepository.delete(agenteFinanceiro);
        return new ModelAndView("redirect:/agenteFinanceiro/visualizarTodos");
    }

}
