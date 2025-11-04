#!/bin/bash
# wait for Elasticsearch & Kibana to be ready
until curl -s http://localhost:5601/api/status | grep -q '"state":"green"'; do
  echo "Waiting for Kibana to be ready…" >&2
  sleep 5
done

echo "Importing dashboard template…"
curl -X POST "http://localhost:5601/api/saved_objects/_import?overwrite=true" \
     -H "kbn-xsrf: true" \
     --form file=@/usr/share/kibana/config/dashboard_template.ndjson

# exec the original entrypoint
exec /usr/local/bin/kibana-docker
