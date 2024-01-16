FROM postgres:latest
ENV POSTGRES_USER ${POSTGRES_USER}
ENV POSTGRES_PASSWORD ${POSTGRES_PASSWORD}
ENV POSTGRES_DB ${POSTGRES_DB}

COPY ./prisma/migrations/ /docker-entrypoint-initdb.d/

EXPOSE 5432

# Use a loop to copy migration.sql from each folder to the corresponding directory in the build context
RUN for folder in /docker-entrypoint-initdb.d/*; do \
	if [ -d "$folder" ]; then \
    cp "$folder/migration.sql" "$folder.sql"; \
		rm -rf "$folder"; \
	fi \
done