package org.example.models;

import java.io.IOException;
import java.util.List;

public class Curso {
    private String nome;
    private int numCreditos;
    private List<Disciplina> disciplinas;
    private List<Semestre> curriculos;

    public Curso(String nome, int numCreditos) {
        this.nome = nome;
        this.numCreditos = numCreditos;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getNumCreditos() {
        return numCreditos;
    }

    public void setNumCreditos(int numCreditos) {
        this.numCreditos = numCreditos;
    }

    public List<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public void setDisciplinas(List<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
    }

    public List<Semestre> getCurriculos() {
        return curriculos;
    }

    public void setCurriculos(List<Semestre> curriculos) {
        this.curriculos = curriculos;
    }

    /**
     * Inclusão do currículo (semestre)
     * @param curriculo
     */
    public void incluirCurriculo(Semestre curriculo) throws IOException {
        if (curriculo.estaValido())
            this.curriculos.add(curriculo);
        else
            throw new IOException("Currículo está inválido!");
    }
}
