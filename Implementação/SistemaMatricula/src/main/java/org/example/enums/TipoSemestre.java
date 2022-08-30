package org.example.enums;

import java.time.LocalDate;
import java.time.Year;

public enum TipoSemestre {
    PRIMEIRO(LocalDate.parse(Year.now().getValue()+"-01-15"), LocalDate.parse(Year.now().getValue()+"-02-15")),
    SEGUNDO(LocalDate.parse(Year.now().getValue()+"-07-15"), LocalDate.parse(Year.now().getValue()+"-08-15"));

    private LocalDate dataInicio;
    private LocalDate dataFim;

    TipoSemestre(LocalDate dataInicio, LocalDate dataFim) {
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    public LocalDate getDataInicio(){
        return this.dataInicio;
    }

    public LocalDate getDataFim(){
        return this.dataFim;
    }

    @Override
    public String toString(){
        return this.name().toLowerCase();
    }
}
