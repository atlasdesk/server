FROM oven/bun

WORKDIR /usr/src/app

COPY . .

RUN bun install --production

# Copy the rest of the source files into the image.


# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD bun --watch ./src/server.ts
