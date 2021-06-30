# todo-spring-quarkus
A demo application that builds and runs as either Spring Boot or Quarkus! Repo backing the blog post at https://developers.redhat.com/blog/2021/02/09/spring-boot-on-quarkus-magic-or-madness/

## Run on Red Hat Developer Sandbox
[Click here](https://workspaces.openshift.com/f?url=https://github.com/edeandrea/todo-spring-quarkus/tree/gradle) to use the free [Red Hat Developer Sandbox](https://developers.redhat.com/developer-sandbox) to try it out on your own! The PostgreSQL database will be embedded as a sidecar container in the workspace!

## Manual Setup
Start up PostgreSQL database:

```
docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 --name tododb -e POSTGRES_USER=todo -e POSTGRES_PASSWORD=todo -e POSTGRES_DB=tododb -p 5432:5432 postgres:13
```

To run as Spring:
```
./gradlew clean bootRun
```

OR

```
./gradlew -Pprofile=spring clean bootRun
```

To run as Quarkus:
```
./.gradlew clean bootRun
```
