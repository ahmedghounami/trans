#!/bin/bash
set -e

echo "🚀 Starting Kibana..."
/usr/local/bin/kibana-docker &

KPID=$!

echo "⏳ Waiting for Kibana API..."
until curl -s http://localhost:5601/api/status | grep -q '"available"'; do
  sleep 2
done

echo "📦 Importing dashboard..."
bin/kibana savedObjects import /usr/share/kibana/config/dashboard.ndjson --force || true

echo "✅ Dashboard imported"
wait $KPID
