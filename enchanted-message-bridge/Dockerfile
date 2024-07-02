FROM openjdk:21-ea-30-slim-bullseye
LABEL authors="kakan"

WORKDIR /app/chat_server

RUN mkdir "/app/chat_server/files"

COPY /target/enchanted-message-bridge-0.0.1-SNAPSHOT.jar /app/chat_server/chat-server.jar

EXPOSE 8080

CMD ["java", "-jar", "chat-server.jar"]