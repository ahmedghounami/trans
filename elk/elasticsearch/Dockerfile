FROM docker.elastic.co/elasticsearch/elasticsearch:8.15.0

COPY ./config/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml

# Put script in a writable dir
COPY ./scripts/setup-elk-users.sh /usr/local/bin/setup-elk-users.sh

# No chmod needed, Docker preserves exec bit from local filesystem
# Ensure script has +x on your host machine

# Launch ES then run script
CMD ["/bin/bash", "-c", "/usr/local/bin/docker-entrypoint.sh eswrapper & sleep 35 && /usr/local/bin/setup-elk-users.sh && wait"]
