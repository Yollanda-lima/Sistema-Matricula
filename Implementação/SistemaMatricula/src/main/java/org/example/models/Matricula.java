package org.example.models;

import java.time.LocalDate;

import org.example.enums.TipoSemestre;

public class Matricula {

    private Disciplina disciplina;
    private Aluno aluno;
    private LocalDate dataMatricula;
    private TipoSemestre tipoSemestre;

    public Matricula(Disciplina disciplina, Aluno aluno, LocalDate dataMatricula, TipoSemestre tipoSemestre) throws Exception{
        this.tipoSemestre = tipoSemestre;
        this.fluxogramaMatricula(dataMatricula, disciplina, aluno);
    }

    private void fluxogramaMatricula(LocalDate dataMatricula, Disciplina disciplina, Aluno aluno) throws Exception{
        this.verificarMatriculaPelaData(dataMatricula);
        this.verificarDisciplina(disciplina);
        this.verificarAluno(aluno);
    }


    private void verificarAluno(Aluno aluno) throws Exception{
        if (aluno.possivelIncluirDisciplina(this.disciplina)){
            this.aluno = aluno;
        }else{
            throw new Exception("Limite de disciplinas excedido");
        }
    }

    private void verificarDisciplina(Disciplina disciplina) throws Exception{
        if (disciplina.vagaDisponivelParaAluno(aluno)){
            this.disciplina = disciplina;
        }else{
            throw new Exception("Vaga nao disponivel para o aluno");
        }
    }

    private void verificarMatriculaPelaData(LocalDate dataMatricula) throws Exception{
            if (this.tipoSemestre.getDataInicio().isBefore(dataMatricula) && this.tipoSemestre.getDataFim().isAfter(dataMatricula)){
                this.dataMatricula = dataMatricula;
            }else{
                throw new Exception("Matricula fora da data"); 
            }
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public LocalDate getDataMatricula() {
        return dataMatricula;
    }
}
