FROM intelygenz/serverless


WORKDIR /app/graphql
COPY . .

RUN apk --update add openjdk7-jre

RUN serverless dynamodb install --localPath ./bin
ENTRYPOINT ["offline", "start"]
