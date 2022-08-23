package org.example.models;

import java.util.List;

public class Aluno extends Usuario {
    private List<Disciplina> disciplinas;

    public Aluno(String nome, String email, String senha, List<Disciplina> disciplinas) {
        super(nome, email, senha);
        this.disciplinas = disciplinas;
    }

    public List<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public void setDisciplinas(List<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
    }

    /**
     * Inclusão de disciplina para matrícula do aluno
     * @param disciplina a ser incluído
     */
    public void incluirDisciplina(Disciplina disciplina) {

    }

    /**
     * Remoção de disciplina na matrícula do aluno
     * @param disciplina a ser incluído
     */
    public void removerDisciplina(Disciplina disciplina) {

    }

    /**
     * Método que avaliará se a inclusão ou remoção da
     * disciplina na matrícula do aluno é válida ou não
     * @return true caso seja válido a operação
     */
    public boolean acaoValida() {
        return false;
    }
}
