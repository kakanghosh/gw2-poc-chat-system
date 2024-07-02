FROM openjdk:21-ea-30-slim-bullseye
LABEL authors="kakan"

WORKDIR /app/db_migration

COPY /target/database-migration-0.0.1-SNAPSHOT.jar /app/db_migration/database-migration.jar

CMD ["java", "-jar", "database-migration.jar"]