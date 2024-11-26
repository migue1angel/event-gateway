## Grupo 4

Archivos principales para revisión:
1. main.ts
2. transports/nats.module
3. email.controller && email.module (Chimborazo)
4. event.controller && event.module (Pucuji)
5. orders.controller && orders.module (De Almada)
6. auth.controller && auth.module (Nuñez)



## Project setup
1. install dependencies
2. Copy the .env.template file and rename it as .env
3. Set up nats server with: docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats

## Development mode

```bash
$ npm run start:dev
```