# The Enchanted Message Bridge

This guide provides instructions on how to build and run your application using Docker and Docker Compose.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

### 3. Run docker compose file

Finally, run the docker compose command to start the application

```
docker compose up
```

## Development prerequisites

## Prerequisites

- Maven 3.6+ and Java 21
- Node >= 18.19 lts
- Docker installed on your machine
- Docker Compose installed on your machine

```
docker build -t chat-client:2024-07-02-02-46 --build-arg BASE_API_URL=http://localhost:8080 .
```