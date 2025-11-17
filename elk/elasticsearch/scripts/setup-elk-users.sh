#!/usr/bin/env bash
set -e

ES_URL="https://localhost:9200"
ELASTIC_PASSWORD="macidarouri"

# Disable certificate verification only if you're using self-signed certs locally
CURL="curl -k -u elastic:${ELASTIC_PASSWORD} -H 'Content-Type: application/json'"

echo ">> Setting password for kibana_system"
$CURL -X POST "${ES_URL}/_security/user/kibana_system/_password" -d '{
  "password": "macidarouri"
}'

echo ">> Creating role logstash_writer"
$CURL -X POST "${ES_URL}/_security/role/logstash_writer" -d '{
  "cluster": ["monitor","manage_ilm"],
  "indices": [
    {
      "names": ["docker-logs-*"],
      "privileges": ["write","create","delete","create_index","manage"]
    }
  ]
}'

echo ">> Creating user logstash_internal"
$CURL -X POST "${ES_URL}/_security/user/logstash_internal" -d '{
  "password": "macidarouri",
  "roles": ["logstash_writer"]
}'

echo ">> (Optional) beats_system password"
$CURL -X POST "${ES_URL}/_security/user/beats_system/_password" -d '{
  "password": "macidarouri"
}'

echo "DONE."
