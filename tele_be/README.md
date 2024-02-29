# Telegram API
A restful API built with Node.js, MySQL, JWT authentication, TypeScript, and Docker.

## Local development

### Install Docker
This project uses [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/).

### Start Docker container
The Docker container includes the Node.js and the MySQL servers. Start the servers with the following command:

```shell
docker compose up -d
```

A web server will be setup, available at http://localhost:4968. Change to TypeScript files will trigger an automatic reload of the server, and your modifications will imediatelly be taken into account. One database is also created in the MySQL server. Please note that the server may take a moment to install dependencies and start.

### Stop Docker container
To stop, run `docker-compose stop` or hit CTRL-C on the terminal your docker-compose is running in.

After that, to start with code changes, you'll want to `docker-compose down`
to clean up.

### Logs
Logs of containerized servers are captured and available in [Docker logs](https://docs.docker.com/config/containers/logging/).
