#!/bin/bash

ts=$(gdate +%s%N)
$1 &
pid=$!

while ! (curl -sf http://localhost:8080/todo > /dev/null)
do
  sleep .2
  printf "."
done

printf "Time to 1st request: [%s]\n" "$((($(gdate +%s%N) - $ts)/1000000))ms"
echo "pid was $pid"
kill -9 $pid
