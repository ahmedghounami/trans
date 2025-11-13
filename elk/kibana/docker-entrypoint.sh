#!/bin/bash
set -e

echo "🟡 Waiting for Elasticsearch to be ready..."
until curl -s http://elasticsearch:9200 | grep -q "You Know, for Search"; do
  sleep 5
done
echo "✅ Elasticsearch is reachable."

echo "🚀 Starting Kibana..."
/usr/local/bin/kibana-docker &

# Wait until Kibana’s saved_objects API is alive (not just green)
echo "🟢 Waiting for Kibana Saved Objects API..."
until curl -sf http://localhost:5601/api/saved_objects/_find?type=index-pattern > /dev/null; do
  sleep 5
done

# Create data view if not exists
echo "🧱 Creating default data view logs-*..."
curl -sf -X POST "http://localhost:5601/api/data_views/data_view" \
  -H "kbn-xsrf: true" \
  -H "Content-Type: application/json" \
  -d '{"data_view":{"title":"logs-*","timeFieldName":"@timestamp"}}' || true

# Import dashboard
echo "📦 Importing dashboard template..."
IMPORT_RESPONSE=$(curl -sf -X POST "http://localhost:5601/api/saved_objects/_import?overwrite=true" \
  -H "kbn-xsrf: true" \
  --form file=@/usr/share/kibana/config/dashboard_template.ndjson || true)

echo "$IMPORT_RESPONSE" | grep -q '"successCount"' && \
  echo "✅ Dashboard imported successfully!" || \
  echo "⚠️ Dashboard import may have failed, check logs."

wait
