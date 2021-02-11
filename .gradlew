#!/bin/sh
./gradlew -Pprofile=quarkus -Dquarkus.http.host=0.0.0.0 $@
