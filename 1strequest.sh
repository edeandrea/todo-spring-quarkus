#!/bin/bash

# 1st argument is the command to execute
# 2nd argument is the number of iterations. If not specified defaults to 1

# Example usage
# 1) Run a quarkus native application 10 times
# $ ./1strequest.sh target/todo-spring-quarkus-0.0.1-SNAPSHOT-runner 10
#
# 2) Run a quarkus jvm application 1 time
# $ ./1strequest.sh "java -jar target/quarkus-app/quarkus-run.jar"

COMMAND=$1
NUM_ITERATIONS=1
RSS=()
TTFR=()
TOTAL_RSS=0
TOTAL_TTFR=0

if [ "$#" -eq 2 ]; then
  NUM_ITERATIONS=$2
fi

for (( i=0; i<$NUM_ITERATIONS; i++))
do
  ts=$(gdate +%s%N)
  $1 &
  pid=$!

  while ! (curl -sf http://localhost:8080/todo > /dev/null)
  do
    sleep .2
    printf "."
  done

  TTFR[$i]=$((($(gdate +%s%N) - $ts)/1000000))
  RSS[$i]=`ps -o rss= -p $pid | sed 's/^ *//g'`
  TOTAL_RSS=$((TOTAL_RSS + RSS[$i]))
  TOTAL_TTFR=$((TOTAL_TTFR + TTFR[$i]))
  kill $pid
  wait $pid 2> /dev/null
done

echo
echo
echo
echo "-------------------------------------------------"
printf "AVG RSS (after 1st request): %.1f MB\n" $(echo "$TOTAL_RSS / $NUM_ITERATIONS / 1024" | bc -l)
printf "AVG time to first request: %.3f sec\n" $(echo "$TOTAL_TTFR / $NUM_ITERATIONS / 1000" | bc -l)
echo "-------------------------------------------------"
