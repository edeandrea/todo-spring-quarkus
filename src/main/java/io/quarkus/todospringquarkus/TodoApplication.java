package io.quarkus.todospringquarkus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// THIS CLASS IS NOT NEEDED FOR QUARKUS+SPRING SUPPORT
@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

}