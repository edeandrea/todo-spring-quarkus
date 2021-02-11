#!/bin/sh
./mvnw clean quarkus:dev -Pquarkus -Dquarkus.http.host=0.0.0.0
