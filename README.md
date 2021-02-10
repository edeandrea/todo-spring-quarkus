# todo-spring-quarkus
A demo application that builds and runs as either Spring Boot or Quarkus! Repo supporting the blog post at https://developers.redhat.com/blog/2021/02/09/spring-boot-on-quarkus-magic-or-madness/

Run the PostgreSQL database:

```
docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 --name tododb -e POSTGRES_USER=todo -e POSTGRES_PASSWORD=todo -e POSTGRES_DB=tododb -p 5432:5432 postgres:11.5
```

To run as Spring Boot:

```
./mvnw clean spring-boot:run
```

To run as Quarkus:

```
./.mvnw clean spring-boot:run
```
