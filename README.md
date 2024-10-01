# Documentação

Nese projeto temos a documentação necessária para usar a aplicação.

## Definição das entidades e seus relacionamentos

### Profiles
* id: Chave primária
* lastName
* profession
* balance
* type: Podendo ser `cliente` ou `contratado`, em que o `Profile` do tipo `cliente` será o que contrata serviços do `Profiles` do tipo `contratado`.

### Deposits
* id: Chave Primária 
* clientId: Chave estrangeira referente a `Profiles` de qualquer tipo
* operationDate.
* depositValue: Valor do depósito

### Contracts
* id: Chave primária
* termes: Termos do contrato
* clientId: Chave estrangeira referente a `Profiles` do tipo `clientes`, ou seja, que seja quem está contranado os serviços(job) no contrato.
* contractorId: Chave estrangeira referente `Profiles` do tipo `contratado`, ou seja, quem está sendo contratado para prestar serviços.
* operationDate.
* status: Aqui pode ser qualquer coisa relacionado ao contrato, pode ser "aberto", finalizado etc.

### Job
* id: Chave primária,
* contractId: Chave restrangeira referente a `Contracts`, ou seja, ao contrato no qual o serviço(job) deve pertencer.
* description.
* operationDate: Data em que o pagamento está sendo feito.
* paymentDate: Data no qual o pagamento deve ser feito.
* price: 
* paid: Por padrão é falso, mudando para true somente quando o valor do serviço(job) for totalmente pago.

### Payment
* id: Chave primária
* job_id: Chave estrangeira referente a `Job`, para indicar a qual serviço(job) este pagamento está sendo feito.
* operationDate
* paymentValue: Valor do pagamento

## Endpoints 

## Cadastro de Profile
* Tipo de métod http: `POST`
* url: `localhost:8000/create/profile/`
* Dados a serem enviados:
~~~ json
{
    "firstName": "João",
    "lastName": "Silva",
    "profession": "Desenvolvedor",
    "balance": 1000.50,
    "type": "cliente"
}
~~~

## Obeter saldo de um Profile
* Tipo de métod http: `GET`
* url: `localhost:8000/get-balace/:id/profile`
* Exemplo: `localhost:8000/get-balace/2/profile`

## Criar um depósito
* Tipo de métod http: `POST`
* url: `localhost:8000/create/deposit`
* Dados a serem enviados:
~~~ json
{
    "clientId": 1,
    "depositValue": 500.00
}
~~~
* Observações: Nesse caso haverá validação se o cliente(Profiles) existe, e invalidar a operção caso o valor de depósito seja menor ou igual a 0.

## Cadastro de Contrato
* Tipo de métod http: `POST`
* url: `localhost:8000/create/contract`
* Dados a serem enviados:
~~~ json
{
    "termes": "Termos do contrato", 
    "clientId": 1, 
    "contractorId": 2, 
    "status": "Aberto", #Pode ser qualquer coisa aqui
}
~~~
Obserbvações: Será verificado se o cliente e o contratante existem antes criar o contrato.

## Cadastro de Job
* Tipo de métod http: `POST`
* url: `localhost:8000/create/job`
* Dados a serem enviados:
~~~ json
{
    "description": "Descrição do job",
    "contractId": 2,
    "paymentDate": "2024-11-23",
    "price": 23.40
}
~~~
Observações: Será verificado se o contrato existe antes de criar o job.

## Listar os jobs de um Contrato
* Tipo de métod http: `GET`
* url: `localhost:8000/get-jobs/:contractId/contract`
* Exemplo: `localhost:8000/get-jobs/2/contract`

## Criar um pagamento(Payment)
* Tipo de métod http: `POST`
* url: `localhost:8000/create/payment`
* Dados a serem enviados:
~~~ json
{
    "jobId": 1,
    "paymentValue": 300.00
}
~~~
* Observações: Será verificado a existência do Job, e caso o valor de pagamento seja negativo a operção será ivalidada. O saldo do cliente(quem paga) terá o valor de pagamento descontado, e o saldo do contratante(quem recebe) terá o valor de pagamento acrescido.

## Obter a soma de todos os Jobs que não foram pagos integralmente
* Tipo de métod http: `GET`
* url: `localhost:8000//get-unpaid-jobs-sum`

