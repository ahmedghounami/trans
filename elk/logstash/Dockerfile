FROM docker.elastic.co/logstash/logstash:8.15.0

USER root

RUN mkdir -p /usr/share/logstash/config/certs

COPY config/logstash.yml /usr/share/logstash/config/logstash.yml
COPY pipeline/logstash.conf /usr/share/logstash/pipeline/logstash.conf
