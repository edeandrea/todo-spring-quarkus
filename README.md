# todo-spring-quarkus
A demo application that builds and runs as either Spring Boot or Quarkus! Repo supporting the blog post at https://developers.redhat.com/blog/2021/02/09/spring-boot-on-quarkus-magic-or-madness/

## Run on Red Hat Developer Sandbox
[Click here](https://workspaces.openshift.com/f?url=https://github.com/edeandrea/todo-spring-quarkus) to use the free [Red Hat Developer Sandbox](https://developers.redhat.com/developer-sandbox) to try it out on your own! The PostgreSQL database will be embedded as a sidecar container in the workspace!

## Setup
Run the PostgreSQL database:

```
docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 --name tododb -e POSTGRES_USER=todo -e POSTGRES_PASSWORD=todo -e POSTGRES_DB=tododb -p 5432:5432 postgres:11.5
```

## Run on JVM
### Spring Boot

```
./mvnw clean package spring-boot:run
```

### Quarkus

```
./.mvnw clean spring-boot:run
```

## Native Image
### Quarkus Native Image

To build Quarkus Native Image:

```shell
./mvnw clean package -Pquarkus-native
```

To run Quarkus Native Image once built:

```shell
target/todo-spring-quarkus-0.0.1-SNAPSHOT-runner
```

### Spring Boot Native Image
Removed the following from the Spring version due to lack of support while keeping the matching technologies in the Quarkus version:
- SpringDoc OpenAPI with Swagger UI
- Dekorate
- Spring Boot DevTools
- Micrometer Metrics/Prometheus

Also needed to remove transactional support
- Spring Native doesn't recognize the `@javax.transaction.Transactional` annotation
- It also doesn't recognize `@org.springframework.transaction.annotation.Transactional`
- Removed transactions completely for this exercise

To build Spring Boot Native Image:
1. Follow all the setup as documented in the [system requirements](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#_system_requirements_2)
1. Run

   ```shell
   ./mvnw clean package -Pspring-native
   ```

To run Spring Boot Native Image:

```shell
target/io.quarkus.todospringquarkus.todoapplication
```
