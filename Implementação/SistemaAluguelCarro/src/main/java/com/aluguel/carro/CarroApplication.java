package com.aluguel.carro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = { "com.aluguel.carro.entity" })
@EnableJpaRepositories(basePackages = { "com.aluguel.carro.repository" })
@ComponentScan(basePackages = {"com.aluguel.carro.controller"})
public class CarroApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarroApplication.class, args);
	}

}
