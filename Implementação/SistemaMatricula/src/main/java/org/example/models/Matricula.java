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
        this.verificarMatricula(dataMatricula);
        this.disciplina = disciplina;
        this.aluno = aluno;
    }

    private void verificarMatricula(LocalDate dataMatricula) throws Exception{
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
