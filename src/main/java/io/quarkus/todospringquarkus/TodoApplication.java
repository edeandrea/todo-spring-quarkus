package io.quarkus.todospringquarkus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// THIS CLASS IS NOT NEEDED FOR QUARKUS. ONLY HERE FOR SPRING BOOT SUPPORT.
@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

}