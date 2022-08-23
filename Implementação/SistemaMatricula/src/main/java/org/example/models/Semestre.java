package org.example.models;

import java.time.LocalDate;
import java.util.List;

public class Semestre {
    private List<Matricula> matriculas;
    private LocalDate dataInicioMatricula;
    private LocalDate dataFimMatricula;
    private int semestre;
    private int ano;

    public Semestre(LocalDate dataInicioMatricula, LocalDate dataFimMatricula, int semestre, int ano) {
        this.dataInicioMatricula = dataInicioMatricula;
        this.dataFimMatricula = dataFimMatricula;
        this.semestre = semestre;
        this.ano = ano;
    }

    public List<Matricula> getMatriculas() {
        return matriculas;
    }

    public void setMatriculas(List<Matricula> matriculas) {
        this.matriculas = matriculas;
    }

    public LocalDate getDataInicioMatricula() {
        return dataInicioMatricula;
    }

    public void setDataInicioMatricula(LocalDate dataInicioMatricula) {
        this.dataInicioMatricula = dataInicioMatricula;
    }

    public LocalDate getDataFimMatricula() {
        return dataFimMatricula;
    }

    public void setDataFimMatricula(LocalDate dataFimMatricula) {
        this.dataFimMatricula = dataFimMatricula;
    }

    public int getSemestre() {
        return semestre;
    }

    public void setSemestre(int semestre) {
        this.semestre = semestre;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    /**
     * Avalia se a matricula é válida ao incluir no semestre
     * @param matricula a ser incluído
     * @return se a matricula é valida ou não
     */
    public boolean matriculaValida(Matricula matricula) {
        return false;
    }
}
