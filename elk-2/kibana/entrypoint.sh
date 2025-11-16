#!/bin/bash
set -e

echo "🚀 Starting Kibana..."
/usr/local/bin/kibana-docker &

KPID=$!

echo "⏳ Waiting for Kibana to start..."
until curl -s http://localhost:5601/api/status | grep -q '"overall":{"level":"available"'; do
  sleep 2
done

echo "📦 Importing Data View & Dashboard automatically..."

# Import dashboard file without HTTP API
bin/kibana-plugin list > /dev/null 2>&1

bin/kibana savedObjects import /usr/share/kibana/config/dashboard.ndjson --force

echo "🎉 Dashboard imported automatically!"

wait $KPID
