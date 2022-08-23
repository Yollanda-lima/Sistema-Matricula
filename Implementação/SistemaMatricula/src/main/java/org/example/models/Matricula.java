package org.example.models;

import java.time.LocalDate;

public class Matricula {
    public static final int NUM_MAX_DISCIPLINAS_OPTATIVAS = 2;
    public static final int NUM_MIN_DISCIPLINAS_OPTATIVAS = 4;

    private Disciplina disciplina;
    private Aluno aluno;
    private LocalDate data;

    public Matricula(Disciplina disciplina, Aluno aluno, LocalDate data) {
        this.disciplina = disciplina;
        this.aluno = aluno;
        this.data = data;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    /**
     * Método que avaliará se a sua disciplina e o aluno está correta de acordo
     * com a regra de negócio
     * @return
     */
    private boolean matriculaValida() {
        return false;
    }
}
