package org.example.models;

import org.example.enums.TipoDisciplina;

import java.util.List;

public class Disciplina {
    public static final int NUM_MAX_INSCRICOES = 60;
    public static final int NUM_MIN_INSCRICOES = 3;

    private TipoDisciplina tipoDisciplina;
    private boolean estaAtivo;
    private String nome;
    private List<Aluno> alunosMatriculados;
    private Professor professor;

    public Disciplina(TipoDisciplina tipoDisciplina, String nome, Professor professor) {
        this.tipoDisciplina = tipoDisciplina;
        this.nome = nome;
        this.professor = professor;
    }

    public TipoDisciplina getTipoDisciplina() {
        return tipoDisciplina;
    }

    public void setTipoDisciplina(TipoDisciplina tipoDisciplina) {
        this.tipoDisciplina = tipoDisciplina;
    }

    public boolean isEstaAtivo() {
        return estaAtivo;
    }

    public void setEstaAtivo(boolean estaAtivo) {
        this.estaAtivo = estaAtivo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Aluno> getAlunosMatriculados() {
        return alunosMatriculados;
    }

    public void setAlunosMatriculados(List<Aluno> alunosMatriculados) {
        this.alunosMatriculados = alunosMatriculados;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    /**
     * Método para saber se a disciplina atingiu a capacidade máxima de alunos
     * matriculados
     * @return true caso atinja a capacidade máxima de alunos.
     */
    public boolean estaCheio() {
        return false;
    }


    /**
     * Método para saber se a disciplina possui o número mínimo de alunos para
     * ser ativado no fim da matricula
     * @return true caso tenha a quantidade mínima de alunos matriculados
     */
    public boolean possuiMinAlunos() {
        return false;
    }
}
