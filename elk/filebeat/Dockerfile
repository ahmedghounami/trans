FROM docker.elastic.co/beats/filebeat:8.15.0

COPY filebeat.yml /usr/share/filebeat/filebeat.yml

# Required: config file must not be world-readable
USER root
RUN chmod go-w /usr/share/filebeat/filebeat.yml

USER filebeat
