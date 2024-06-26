# Trabalho-SD
 
# Trabalho-SD
## Introdução
Este trabalho se trata do uso de MongoDB + Kafka + React Typecript para criar e administrar um sistema de medicamentos, prescrições, clínicas e pessoas envolvidas no processo.

Um dockerfile é fornecido para facilitar a utilização do projeto. Ele pode ser iniciado com os seguintes commandos:
```
docker compose build --no-cache
docker compose up
```

Ou executando o script auxiliar `./fresh.sh`.

Para acessar o frontend, acesse a url `http://andromeda.lasdpc.icmc.usp.br:5011`, embora, por causa de erros de CORS, as requisições não estão funcionando.

## Testes
Utilizamos o Locust para fazer os testes de carga do projeto e Locust + Faker para fazer os testes de integridade de escrita, sendo necessário instalá-los com o seguinte comando:
```
pip install locust faker
```

Há três configurações de teste, sendo dois deles testes de carga com diferentes níveis de intensidade e um teste de integridade. Para executá-los é necessário utilizar o seguinte comando nas pastas onde o arquivo `locustfile.py` de cada teste está localizado:
```
locust
```

## Frontend
O frontend foi desenvolvido em React + Typescript para fazer testes simples de escrita para o MongoDB. Ele está disponibilizado na porta 5011 do servidor `andromeda.lasdpc.icmc.usp.br`.

O frontend consiste de tabs para selecionar qual formulário será utilizado e os formulários para mensagens de POST para cada objeto do MongoDB.

## Funcionamento
A implementação do trabalho segue uma pipeline simples onde mensagens GET são tratadas sem o Kafka através de um dos trabalhadores nomeados `portal-{id}`, os quais recebem as mensagens e fazer as requisições diretamente para o MongoDB. A distribuição e roteamento é feita com o Caddy utilizando o algoritmo round-robin.

Para a escrita no entanto, o Kafka é utilizado para garantir a integridade do Mongo e que os processos sejam tratados segundo o princípio FIFO. Neste caso, as mensagens são recebidas pelos trabalhadores e enviadas diretamente para o Kafa. Conforme o Kafka balanceia a distribuição desses trabalhos, os trabalhadores consomem essas requisições e escrevem as entradas no Mongo DB.

## Membros do grupo
Grupo 1 da Turma A:
- Bernardo Maia Coelho - 12542481
- Gustavo Wadas Lopes - 12745640
- Pedro Henrique Vilela do Nascimento - 12803492