<div align="center">
  <h1>NewProjectX - Core API</h1>
</div>

Principal API do NewProjectX.

## 👋 Welcome

- Rodar o comando do docker compose para iniciar o projeto
`docker-compose -f docker-compose-local.yaml up`

Esse comando irá rodar o projeto na versão para desenvolvimento local.

- Para popular o banco
Após rodar o comando para iniciar o projeto, para utilizar o seed configurado, rode o comando:
`npx prisma db seed`

## REST API

### Criar Tenant

#### Request

`curl --location '/api/v1/tenant' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "name":"<NAME>",
    "description":"<DESCRIPTION>"
}'`

### Response

  HTTP/1.1 200 OK
  Date: Thu, 24 Feb 2011 12:36:30 GMT
  Status: 200 OK
  Connection: close
  Content-Type: application/json
  Content-Length: 36

  `
    {
      "message": string,
      "success": boolean,
      "data": object
    }
  `
