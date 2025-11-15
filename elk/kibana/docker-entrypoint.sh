#!/bin/bash
set -e

ES_USER="elastic"
ES_PASS="changeme"
ES_URL="http://elasticsearch:9200"
KIBANA_URL="http://localhost:5601"

echo "🟡 Waiting for Elasticsearch..."
until curl -s -u $ES_USER:$ES_PASS $ES_URL >/dev/null; do
  sleep 3
done
echo "✅ Elasticsearch is ready"

echo "🚀 Starting Kibana..."
/usr/local/bin/kibana-docker &
KIBANA_PID=$!

echo "🟢 Waiting for Kibana API..."
until curl -s $KIBANA_URL/kibana/api/status | grep -q '"available"'; do
  sleep 3
done
echo "✅ Kibana is ready"

echo "🧱 Creating Data View logs-* ..."
curl -s -X POST "$KIBANA_URL/kibana/api/data_views/data_view" \
  -H "kbn-xsrf: true" \
  -H "Content-Type: application/json" \
  -d '{"data_view":{"title":"logs-*","timeFieldName":"@timestamp"}}' || true

echo "📦 Importing Dashboard..."
curl -s -X POST "$KIBANA_URL/kibana/api/saved_objects/_import?overwrite=true" \
  -H "kbn-xsrf: true" \
  --form file=@/usr/share/kibana/config/dashboard_template.ndjson || true

echo "🎉 Dashboard import complete."

wait $KIBANA_PID
