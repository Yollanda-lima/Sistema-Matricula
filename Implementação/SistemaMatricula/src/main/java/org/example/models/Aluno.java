package org.example.models;

import java.lang.reflect.Array;
import java.util.ArrayList;

import org.example.enums.TipoDisciplina;

public class Aluno extends Usuario {
    private ArrayList<Disciplina> disciplinasMatriculadas;

    public Aluno(String nome, String email, String senha) {
        super(nome, email, senha);
        this.disciplinasMatriculadas = new ArrayList<Disciplina>();
    }

    public ArrayList<Disciplina> getDisciplinas() {
        return disciplinasMatriculadas;
    }

    public void setDisciplinas(ArrayList<Disciplina> disciplinas) {
        this.disciplinasMatriculadas = disciplinas;
    }

    /**
     * Inclusão de disciplina para matrícula do aluno
     * @param disciplina a ser incluído
     */
    public void incluirDisciplina(Disciplina disciplina) {
        if(disciplina.getTipoDisciplina() == TipoDisciplina.OBRIGATORIA){
            if(this.quantidadeDisciplinas()< 4){
                this.disciplinasMatriculadas.add(disciplina);
            }
        }
        else{
            if(this)
        }

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
