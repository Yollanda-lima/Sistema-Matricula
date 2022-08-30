package org.example.models;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.ArrayList;

import org.example.enums.TipoDisciplina;
import org.example.enums.TipoSemestre;

public class Aluno extends Usuario {
    private ArrayList<Matricula> disciplinasMatriculadas;
    public static final int NUM_MAX_DISCIPLINAS_OPTATIVAS = 2;
    public static final int NUM_MIN_DISCIPLINAS_OPTATIVAS = 4;

    public Aluno(String nome, String email, String senha) {
        super(nome, email, senha);
        this.disciplinasMatriculadas = new ArrayList<Matricula>();
    }

    public ArrayList<Matricula> getDisciplinas() {
        return disciplinasMatriculadas;
    }

    public void setDisciplinas(ArrayList<Matricula> disciplinas) {
        this.disciplinasMatriculadas = disciplinas;
    }

    /**
     * Inclusão de disciplina para matrícula do aluno
     * @param disciplina a ser incluído
     */
    public void incluirDisciplina(Matricula disciplina) {
        if(disciplina.getTipoDisciplina() == TipoDisciplina.OBRIGATORIA){
            if(this.quantidadeDisciplinas()< 4){
                this.disciplinasMatriculadas.add(disciplina);
            }
        }
        else{
            if(this)
        }

    }

    public void matricularDisciplina(Disciplina disciplina, 
                                     LocalDate dataMatricula,
                                     TipoSemestre tipoSemestre){
        
        Matricula matricula = new Matricula(disciplina, this, dataMatricula);
        
    }

    private int quantidadeDisciplinas(){
        int quantidade = 0;
        for(Disciplina disciplina : this.disciplinasMatriculadas){
            if (disciplina.getTipoDisciplina() == TipoDisciplina.OBRIGATORIA){
                quantidade++;
            }
        }
        return quantidade;
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
