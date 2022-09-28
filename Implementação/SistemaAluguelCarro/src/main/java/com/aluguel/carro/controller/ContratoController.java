package com.aluguel.carro.controller;

import com.aluguel.carro.entity.Contrato;
import com.aluguel.carro.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/contrato")
public class ContratoController {
    @Autowired
    private ContratoRepository contratoRepository;


    @RequestMapping(value = "/cadastrar", method = RequestMethod.GET)
    public String cadastroContrato() {
        return "contratos/cadastroContrato";
    }

    @RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
    public String cadastrarContratoNoSistema(Contrato contrato) {
        System.out.println(contrato);
        contratoRepository.save(contrato);
        return "redirect:/{contrato.getId()}";
    }

}
