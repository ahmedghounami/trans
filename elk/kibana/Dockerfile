FROM docker.elastic.co/kibana/kibana:8.15.0

USER root

COPY ./config/kibana.yml /usr/share/kibana/config/kibana.yml
COPY ./entrypoint.sh /usr/local/bin/kbn-entrypoint.sh

RUN chmod +x /usr/local/bin/kbn-entrypoint.sh

USER kibana
ENTRYPOINT ["/usr/local/bin/kbn-entrypoint.sh"]
