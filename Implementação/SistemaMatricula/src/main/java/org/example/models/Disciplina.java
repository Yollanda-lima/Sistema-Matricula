package org.example.models;

import org.example.enums.TipoDisciplina;

import java.util.ArrayList;

public class Disciplina {
    public static final int NUM_MAX_INSCRICOES = 60;
    public static final int NUM_MIN_INSCRICOES = 3;

    private TipoDisciplina tipoDisciplina;
    private String nome;
    private ArrayList<Aluno> alunosMatriculados;
    private Professor professor;

    public Disciplina(TipoDisciplina tipoDisciplina, String nome, Professor professor) {
        this.tipoDisciplina = tipoDisciplina;
        this.nome = nome;
        this.professor = professor;
        this.alunosMatriculados = new ArrayList<Aluno>();
    }

    public TipoDisciplina getTipoDisciplina() {
        return tipoDisciplina;
    }

    public void setTipoDisciplina(TipoDisciplina tipoDisciplina) {
        this.tipoDisciplina = tipoDisciplina;
    }

    public boolean disciplinaEstaAtivo() {
        return this.possuiMinAlunos();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public ArrayList<Aluno> getAlunosMatriculados() {
        return alunosMatriculados;
    }

    public void matricularAluno(Aluno aluno) throws Exception{
        if (this.turmaCheia()){
            throw new Exception("Turma ja esta cheia");
        }else if(this.verificarAlunoMatriculado(aluno)){
            throw new Exception("Aluno ja esta matriculado");
        }else{
            this.alunosMatriculados.add(aluno);
        }
    }

    private boolean verificarAlunoMatriculado(Aluno aluno){
        return this.alunosMatriculados.contains(aluno);
    }

    public boolean vagaDisponivelParaAluno(Aluno aluno){
        return (! this.turmaCheia()) && (! this.verificarAlunoMatriculado(aluno));
    }

    /**
     * Método para saber se a disciplina atingiu a capacidade máxima de alunos
     * matriculados
     * @return true caso atinja a capacidade máxima de alunos.
     */
    private boolean turmaCheia(){
        return ! (this.alunosMatriculados.size() < NUM_MAX_INSCRICOES);
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    /**
     * Método para saber se a disciplina possui o número mínimo de alunos para
     * ser ativado no fim da matricula
     * @return true caso tenha a quantidade mínima de alunos matriculados
     */
    public boolean possuiMinAlunos() {
        return this.alunosMatriculados.size() >= NUM_MIN_INSCRICOES;
    }
}
