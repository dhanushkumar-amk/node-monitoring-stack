# Use the latest stable Promtail image
FROM grafana/promtail:3.1.1

# Copy our config file
COPY promtail-config.yaml /etc/promtail/config.yml

# Expose syslog port for Render streams (TCP for reliability)
EXPOSE 1514

# Expose syslog port for Render streams (UDP for speed – common for logs)
EXPOSE 1514/udp

# Expose HTTP port for health checks and metrics
EXPOSE 9080

# Run Promtail with our config
CMD ["-config.file=/etc/promtail/config.yml"]
