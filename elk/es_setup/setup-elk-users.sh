#!/usr/bin/env sh
set -e

ES_URL="https://elasticsearch:9200"
ELASTIC_PASSWORD="${ELASTIC_PASSWORD}"

CURL="curl -k -s -u elastic:${ELASTIC_PASSWORD} -H Content-Type:application/json"

# --- WAIT FOR ELASTICSEARCH ---
echo ">> Waiting for Elasticsearch to be ready..."

until curl -k -s -u elastic:${ELASTIC_PASSWORD} "${ES_URL}" >/dev/null 2>&1; do
  echo "   Elasticsearch not ready yet... retrying in 3s"
  sleep 3
done

echo ">> Elasticsearch is ready."

# --- RUN PASSWORD + USER SETUP ---
echo ">> Setting password for kibana_system"
$CURL -X POST "${ES_URL}/_security/user/kibana_system/_password" -d "{
  \"password\": \"${KIBANA_SYSTEM_PASSWORD}\"
}"

echo ">> Creating role logstash_writer"
$CURL -X POST "${ES_URL}/_security/role/logstash_writer" -d '{
  "cluster": ["monitor", "manage_ilm", "manage_index_templates"],
  "indices": [
    {
      "names": ["docker-logs-*"],
      "privileges": ["write","create","delete","create_index","manage"]
    }
  ]
}'

echo ">> Creating logstash_internal user"
$CURL -X POST "${ES_URL}/_security/user/logstash_internal" -d "{
  \"password\": \"${LOGSTASH_INTERNAL_PASSWORD}\",
  \"roles\": [\"logstash_writer\"]
}"

echo ">> Updating beats_system password"
$CURL -X POST "${ES_URL}/_security/user/beats_system/_password" -d "{
  \"password\": \"${BEATS_SYSTEM_PASSWORD}\"
}"

echo "DONE."
