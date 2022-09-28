package com.aluguel.carro.controller;

import com.aluguel.carro.entity.Automovel;
import com.aluguel.carro.entity.Automovel;
import com.aluguel.carro.repository.AutomovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/automovel")
public class AutomovelController {
    @Autowired
    private AutomovelRepository automovelRepository;


    @RequestMapping(value = "/cadastrar", method = RequestMethod.GET)
    public String cadastroAutomovel() {
        return "automoveis/cadastroAutomovel";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.GET)
    public String atualizacaoAutomovel(@PathVariable("id") Long id, Model model) {
        Automovel automovel = automovelRepository.getReferenceById(id);
        System.out.println(automovel.getId());
        model.addAttribute("automovel", automovel);
        return "automoveis/atualizarAutomovel";
    }

    @RequestMapping(value = "/ver/{id}", method = RequestMethod.GET)
    public String verAutomovel(@PathVariable("id") Long id, Model model) {
        Automovel automovel = automovelRepository.getReferenceById(id);
        model.addAttribute("automovel", automovel);
        return "automoveis/verAutomovel";
    }

    @RequestMapping(value = "/visualizarTodos", method = RequestMethod.GET)
    public String visualizarAutomovels(Model model) {
        List<Automovel> listaAutomoveis = automovelRepository.findAll();
        if (!listaAutomoveis.isEmpty()) {
            model.addAttribute("automoveis", listaAutomoveis);
        }
        return "automoveis/visualizarAutomoveis";
    }

    @RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
    public String cadastrarAutomovelNoSistema(Automovel automovel) {
        automovelRepository.save(automovel);

        return "redirect:/automovel/visualizarTodos";
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.POST)
    public String AtualizarAutomovelNoSistema(Automovel automovel, @PathVariable("id") Long id) {
        System.out.println(id);
        automovelRepository.save(automovel);
        return "redirect:/automovel/visualizarTodos";
    }

    @RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE)
    public ModelAndView AtualizarAutomovelNoSistema(@PathVariable("id") Long id) {
        Automovel automovel = automovelRepository.getReferenceById(id);
        automovelRepository.delete(automovel);
        return new ModelAndView("redirect:/automovel/visualizarTodos");
    }

}
