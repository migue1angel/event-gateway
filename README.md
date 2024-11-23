## Project setup
 1. Copy the .env.template file and rename it as .env
2. Set up nats server with: docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats

## Development mode

```bash
$ npm run start:dev
```