package com.aluguel.carro.controller;

import com.aluguel.carro.repository.LivroRepository;
import com.aluguel.carro.entity.Livro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/root")
public class LivroController {

    private LivroRepository livroRepository;

    @Autowired
    public LivroController( LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    @RequestMapping(value = "/{autor}", method = RequestMethod.GET)
    public String listaLivros(@PathVariable("autor") String autor, Model model) {
        List<Livro> listaLivros = livroRepository.findByAutor(autor);
        if (listaLivros != null) {
            model.addAttribute("livros", listaLivros);
        }
        return "listaLivros";
    }

    @RequestMapping(value = "/{autor}", method = RequestMethod.POST)
    public String adicionaLivroAutor(@PathVariable("autor") String autor, Livro livro) {
        livro.setAutor(autor);
        livroRepository.save(livro);
        return "redirect:/{autor}";
    }
}