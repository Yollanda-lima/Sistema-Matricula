package com.aluguel.carro.controller;

import com.aluguel.carro.entity.AgenteEmpresa;
import com.aluguel.carro.entity.AgenteEmpresa;
import com.aluguel.carro.entity.AgenteEmpresa;
import com.aluguel.carro.repository.AgenteEmpresaRepository;
import com.aluguel.carro.repository.AgenteEmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/agenteEmpresa")
public class AgenteEmpresaController {
    @Autowired
    private AgenteEmpresaRepository agenteEmpresaRepository;


    @RequestMapping(value = "/cadastrar", method = RequestMethod.GET)
    public String cadastroAgenteEmpresa() {
        return "agentesEmpresa/cadastroAgenteEmpresa";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.GET)
    public String atualizacaoAgenteEmpresa(@PathVariable("id") Long id, Model model) {
        AgenteEmpresa agenteEmpresa = agenteEmpresaRepository.getReferenceById(id);
        System.out.println(agenteEmpresa.getId());
        model.addAttribute("agenteEmpresa", agenteEmpresa);
        return "agentesEmpresa/atualizarAgenteEmpresa";
    }

    @RequestMapping(value = "/ver/{id}", method = RequestMethod.GET)
    public String verAgenteEmpresa(@PathVariable("id") Long id, Model model) {
        AgenteEmpresa agenteEmpresa = agenteEmpresaRepository.getReferenceById(id);
        model.addAttribute("agenteEmpresa", agenteEmpresa);
        return "agentesEmpresa/verAgenteEmpresa";
    }

    @RequestMapping(value = "/visualizarTodos", method = RequestMethod.GET)
    public String visualizarAgentesEmpresa(Model model) {
        List<AgenteEmpresa> listaAgentesEmpresa = agenteEmpresaRepository.findAll();
        if (!listaAgentesEmpresa.isEmpty()) {
            model.addAttribute("agentesEmpresa", listaAgentesEmpresa);
        }
        return "agentesEmpresa/visualizarAgentesEmpresa";
    }

    @RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
    public String cadastrarAgenteEmpresaNoSistema(AgenteEmpresa agenteEmpresa) {
        agenteEmpresaRepository.save(agenteEmpresa);

        return "redirect:/agenteEmpresa/visualizarTodos";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.POST)
    public String AtualizarAgenteEmpresaNoSistema(AgenteEmpresa agenteEmpresa, @PathVariable("id") Long id) {
        System.out.println(id);
        agenteEmpresaRepository.save(agenteEmpresa);
        return "redirect:/agenteEmpresa/visualizarTodos";
    }

    @RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE)
    public ModelAndView AtualizarAgenteEmpresaNoSistema(@PathVariable("id") Long id) {
        AgenteEmpresa agenteEmpresa = agenteEmpresaRepository.getReferenceById(id);
        agenteEmpresaRepository.delete(agenteEmpresa);
        return new ModelAndView("redirect:/agenteEmpresa/visualizarTodos");
    }

}
