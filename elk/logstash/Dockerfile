FROM docker.elastic.co/logstash/logstash:8.15.0

USER root
COPY ./config/logstash.yml /usr/share/logstash/config/logstash.yml
COPY ./pipeline /usr/share/logstash/pipeline

USER logstash
