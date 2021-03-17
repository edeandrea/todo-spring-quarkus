# todo-spring-quarkus
A demo application that builds and runs as either Spring Boot or Quarkus! Repo supporting the blog post at https://developers.redhat.com/blog/2021/02/09/spring-boot-on-quarkus-magic-or-madness/

## Run on Red Hat Developer Sandbox
[Click here](https://workspaces.openshift.com/f?url=https://github.com/edeandrea/todo-spring-quarkus) to use the free [Red Hat Developer Sandbox](https://developers.redhat.com/developer-sandbox) to try it out on your own! The PostgreSQL database will be embedded as a sidecar container in the workspace!

## Setup
Run the PostgreSQL database:

```
docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 --name tododb -e POSTGRES_USER=todo -e POSTGRES_PASSWORD=todo -e POSTGRES_DB=tododb -p 5432:5432 postgres:11.5
```

To run as Spring Boot:

```
./mvnw clean package spring-boot:run
```

To run as Quarkus:

```
./.mvnw clean spring-boot:run
```

## Native Image
All stats reported below were using a developer desktop with the following specs:
- 2018 MacBook Pro 15"
- macOS 11.2.2
- 16GB Memory
- OpenJDK 11.0.2
- GraalVM CE 21.0.0.r11

### Quarkus Native Image

To build Quarkus Native Image:

```shell
./mvnw clean package -Pquarkus-native
```

To run Quarkus Native Image once built:

```shell
target/todo-spring-quarkus-0.0.1-SNAPSHOT-runner
```

#### Quarkus Native Stats (includes technologies removed from the Spring version)
- **Native Image Build Time:** 3 minutes 20 seconds
- **Native Image Size:** 72 MB
- **Native Image Boot Time:** 0.091 seconds
- **Boot RSS memory usage:** 31.4 MB
- **RSS memory usage after 1st request:** 38.1 MB

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

#### Spring Boot Native Stats
- **Native Image Build Time:** 7 minutes 3 seconds
- **Native Image Size:** 126 MB
- **Native Image Boot Time:** 0.298 seconds 
- **Boot RSS memory usage:** 137.8 MB
- **RSS memory usage after 1st request:** 146.5 MB

### Results Summary
#### JVM - Equivalent functionality in both Quarkus & Spring

| Metric | Quarkus | Spring Boot |
| ------ | ------- | ----------- |
| Build Time | 18s | 10s |
| Binary Size | 35 MB | 65 MB |
| Boot Time | 2.286s | 6.7s |
| Bootup RSS memory usage | 175.5 MB | 425.6 MB |
| RSS memory usage after 1st request | 211.5 MB | 432 MB |

#### Native - Quarkus contains functionality removed from Spring due to lack of support

| Metric | Quarkus | Spring Boot |
| ------ | ------- | ----------- |
| Native Image Build Time | 3m 20s | 7m 3s |
| Native Image Size | 72 MB | 126 MB |
| Native Image Boot Time | 0.091s | 0.298s |
| Bootup RSS memory usage | 31.4 MB | 137.8 MB |
| RSS memory usage after 1st request | 36.5 MB | 146.5 MB |
