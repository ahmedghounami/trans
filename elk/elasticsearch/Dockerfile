FROM docker.elastic.co/elasticsearch/elasticsearch:8.15.0

USER root

COPY ./config/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
RUN chown elasticsearch:elasticsearch /usr/share/elasticsearch/config/elasticsearch.yml

USER elasticsearch
