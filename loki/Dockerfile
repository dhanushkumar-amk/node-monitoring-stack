FROM grafana/loki:latest

COPY loki-config.yaml /etc/loki/local-config.yaml

CMD ["-config.file=/etc/loki/local-config.yaml"]
