package org.example.models;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class Professor extends Usuario {
    private List<Aluno> alunos;
    private List<Disciplina> disciplinas;

    public Professor(String nome, String email, String senha, List<Aluno> alunos, List<Disciplina> disciplinas) {
        super(nome, email, senha);
        this.disciplinas = disciplinas;
    }

    public List<Aluno> getAlunos() {
        return alunos;
    }

    public void setAlunos(List<Aluno> alunos) {
        this.alunos = alunos;
    }

    public List<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public void setDisciplinas(List<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
    }

    /**
     * Retorna os alunos de acordo com sua disciplina
     * @param disciplina
     * @return
     */
    public List<Aluno> alunosPelaDisciplina(Disciplina disciplina) {
        return this.alunos.stream()
                .filter((aluno) -> aluno.getDisciplinas()
                    .stream()
                    .anyMatch(((disc) -> disc.getNome().equals(disciplina.getNome())))
                )
                .collect(Collectors.toList());
    }
}
