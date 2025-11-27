FROM grafana/promtail:3.1.1  # Latest stable version

# Copy config
COPY promtail-config.yaml /etc/promtail/config.yml

# Listen on port 1514 for syslog (standard UDP/TCP)
EXPOSE 1514

CMD ["-config.file=/etc/promtail/config.yml"]
