# Use the latest stable Promtail image
FROM grafana/promtail:3.1.1

# Copy our config file
COPY promtail-config.yaml /etc/promtail/config.yml

# Expose syslog port (Render will stream logs here)
EXPOSE 1514
EXPOSE 1514/udp   # Important for syslog over UDP

# Health check endpoint
EXPOSE 9080

# Run Promtail
CMD ["-config.file=/etc/promtail/config.yml"]
