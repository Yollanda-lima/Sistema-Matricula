package org.example.models;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.ArrayList;

import org.example.enums.TipoDisciplina;
import org.example.enums.TipoSemestre;

public class Aluno extends Usuario {
    private ArrayList<Disciplina> disciplinasMatriculadas;
    public static final int NUM_MAX_DISCIPLINAS_OPTATIVAS = 2;
    public static final int NUM_MIN_DISCIPLINAS_OBRIGATORIAS = 4;

    public Aluno(String nome, String email, String senha) {
        super(nome, email, senha);
        this.disciplinasMatriculadas = new ArrayList<Disciplina>();
    }

    public ArrayList<Disciplina> getDisciplinas() {
        return disciplinasMatriculadas;
    }

    /**
     * Inclusão de disciplina para matrícula do aluno
     * @param disciplina a ser incluído
     */
    public void incluirDisciplina(Disciplina disciplina) {
        if (this.possivelIncluirDisciplina(disciplina)){
            this.disciplinasMatriculadas.add(disciplina);
        }
    }

    public boolean possivelIncluirDisciplina(Disciplina disciplina){
        int quantidadeDisciplinas = this.quantidadeDisciplinas(disciplina);
        if(disciplina.getTipoDisciplina() == TipoDisciplina.OBRIGATORIA){
            if(quantidadeDisciplinas < NUM_MIN_DISCIPLINAS_OBRIGATORIAS){
                return true;
            }
        }
        else{
            if(disciplina.getTipoDisciplina() == TipoDisciplina.OPTATIVA){
                if(quantidadeDisciplinas < NUM_MAX_DISCIPLINAS_OPTATIVAS){
                    return true;
                }
            }
        }
        return false;
    }

    public void matricularDisciplina(Disciplina disciplina, 
                                     LocalDate dataMatricula,
                                     TipoSemestre tipoSemestre){
        
        try {
            Matricula matricula = new Matricula(disciplina, this, dataMatricula, tipoSemestre);
            disciplina.matricularAluno(this);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        
    }

    private int quantidadeDisciplinas(Disciplina disciplina){
        int quantidade = 0;
        for(Disciplina disciplinaMatriculada : this.disciplinasMatriculadas){
            if (disciplina.getTipoDisciplina() == disciplinaMatriculada.getTipoDisciplina()){
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
        this.disciplinasMatriculadas.remove(disciplina);
    }

}
