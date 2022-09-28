package com.aluguel.carro.controller;

import com.aluguel.carro.entity.AgenteEmpresa;
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
@RequestMapping("/")
public class indexController {


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String cadastroAgenteEmpresa() {
        return "index";
    }

}
