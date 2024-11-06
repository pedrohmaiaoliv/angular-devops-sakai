# Petshop CRUD

Este projeto foi criado como parte de uma atividade prática para aprendizado de sistemas legados e frameworks JavaScript. Ele utiliza o Angular para desenvolver uma aplicação CRUD com o Firebase como banco de dados e recursos de integração com a API ViaCEP e IBGE para preenchimento de endereços automaticamente. A aplicação possui uma tela de login e permite o cadastro de pets, tutores e serviços de um pet shop.

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
[npm start]
```

## Funcionalidades Principais

- **Cadastro e Gerenciamento de Pets, Tutores e Serviços:** Inclui validações de campos e uso de máscaras.
- **Busca Automática de Endereço pelo CEP:** Integração com a API ViaCEP para preenchimento automático dos campos de endereço. Caso o CEP não seja encontrado, é possível inserir as informações manualmente.
- **Listagem Dinâmica de Estados e Municípios:** Integração com a API do IBGE para seleção de estado e município, exibindo os municípios correspondentes ao estado escolhido.
- **Sistema de Login Simples:** Inclui uma tela inicial de login, com autenticação simulada usando variáveis e condicionais.

## Instalação

Para instalar as dependências e configurar o ambiente, siga estas etapas:

```bash
[npm install]
```

## Comandos Úteis

```bash
[npm install firebase @angular/fire@16.0.0]
```

## Versionamento e Deploy

Este projeto segue as boas práticas de versionamento no Git, com as seguintes branches principais:

- **main:** Branch de produção.
- **staging:** Branch de teste antes do deploy para produção.
- **develop:** Branch de desenvolvimento, onde novas funcionalidades são testadas.

O projeto está hospedado na Vercel com deploys automáticos configurados a partir da integração com o GitHub. Para visualizar o projeto online, acesse o link disponível no repositório.
