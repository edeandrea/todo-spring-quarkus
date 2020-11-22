# todo-spring-quarkus
A demo application that builds and runs as either Spring Boot or Quarkus!


```
docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 --name tododb -e POSTGRES_USER=todo -e POSTGRES_PASSWORD=todo -e POSTGRES_DB=tododb -p 5432:5432 postgres:11.5
```

alias mvnw='./.mvnw'