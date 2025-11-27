FROM prom/prometheus:latest

# Copy our config file
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Expose Prometheus UI port
EXPOSE 9090

# Use the config we provided
CMD [ "--config.file=/etc/prometheus/prometheus.yml", "--storage.tsdb.path=/prometheus" ]
