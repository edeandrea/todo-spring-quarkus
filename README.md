# todo-spring-quarkus
A demo application that builds and runs as either Spring Boot or Quarkus! Repo supporting the blog post at https://developers.redhat.com/blog/2021/02/09/spring-boot-on-quarkus-magic-or-madness/

## Run on Red Hat Developer Sandbox
[Click here](https://workspaces.openshift.com/f?url=https://github.com/edeandrea/todo-spring-quarkus) to use the free [Red Hat Developer Sandbox](https://developers.redhat.com/developer-sandbox) to try it out on your own! The PostgreSQL database will be embedded as a sidecar container in the workspace!

## Manual Setup
Run the PostgreSQL database:

```
docker run -it --rm --name tododb -e POSTGRES_USER=todo -e POSTGRES_PASSWORD=todo -e POSTGRES_DB=tododb -p 5432:5432 postgres:14
```

To run as Spring Boot:

```
./mvnw clean spring-boot:run
```

To run as Quarkus:

```
./.mvnw clean spring-boot:run
```
