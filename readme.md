# The Enchanted Message Bridge

This guide provides instructions on how to build and run your application using Docker and Docker Compose.

## Prerequisites

- Maven 3.6+ and Java 21
- Node >= 18.19 lts
- Docker installed on your machine
- Docker Compose installed on your machine

## DB migration app

Go to `database-migration` root folder, run

```
$ mvn clean package -DskipTests=true

$ docker build -t chat-db-migrate:2024-07-02-10-37 .
```

## Chat server

Go to `enchanted-message-bridge` root folder, run

```
$ mvn clean package -DskipTests=true

$ docker build -t emb-chat-server:2024-07-02-10-58 .
```

## Chat client

Go to `emb-chat-client` root folder, run

```
$ docker build -t chat-client:2024-07-02-02-46 --build-arg BASE_API_URL=http://localhost:8080 .
```

### Run docker compose file

Finally, go to top root `gw2-poc-chat-system` and run the docker compose command
to start the external services and application

```
docker compose -f services-docker-compose.yml -f apps-docker-compose.yml up
```

If everything goes well, you will be able to access the application on http://localhost:3000

- On first screen app will ask you to a user to start with
- In second screen, you can choose to person who you want to send the message
- Now, you can send messages and share files

### Note

You can change the docker image tag while building the application.
If you do so, please make sure, you have updated the corresponding image name in the
[apps-docker-compose.yml](apps-docker-compose.yml)

Please check [design-documents](design-documents) to get the overview of system design

Please check [screenshots](screenshots) to get an idea about the application