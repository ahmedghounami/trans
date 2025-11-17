FROM docker.elastic.co/kibana/kibana:8.15.0

USER root

# Create cert directory
RUN mkdir -p /usr/share/kibana/config/certs

# Copy config
COPY config/kibana.yml /usr/share/kibana/config/kibana.yml

# Certs come from shared docker volume (not copied)
# But Kibana requires secure permissions
RUN chmod go-w /usr/share/kibana/config/kibana.yml

# Entry script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER kibana

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
