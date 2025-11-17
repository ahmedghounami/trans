FROM docker.elastic.co/elasticsearch/elasticsearch:8.15.0

# Only copy the elasticsearch.yml safely
COPY --chown=elasticsearch:elasticsearch ./config/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
