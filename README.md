# Sistema de Gerenciamento de Bilheteria de Cinema (SGBC)

Este projeto é um sistema de gerenciamento de cinema desenvolvido em **TypeScript**. Ele utiliza scripts **SQL** para integração com o banco de dados e foi projetado para gerenciar registros simples com uma interface de usuário intuitiva. O sistema segue uma arquitetura modular, separando as responsabilidades entre controle, visualização e modelos de dados.

## Diretórios Principais

- [diagrams](diagrams): Contém diagramas do sistema, como o modelo de dados e o fluxo de navegação.
- [sql](sql): Inclui scripts SQL para criar e popular o banco de dados com os esquemas necessários.
- [src](src): Abriga toda a lógica do aplicativo.

## Funcionalidades

- **CRUD Completo**: Permite a criação, leitura, atualização e exclusão de registros em um banco de dados.
- **Integração com SQL**: O banco de dados é configurado utilizando scripts SQL fornecidos na pasta `sql/`.
- **Separação de Preocupações**: O sistema separa responsabilidades entre modelos de dados, controle de operações e visualização.
- **Desenvolvido em TypeScript**: O código é tipado, proporcionando maior segurança e escalabilidade.
- **Ambiente configurável com SWC e Yarn**: Utiliza SWC para uma compilação rápida e Yarn para o gerenciamento de dependências.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js**
- **Yarn**
- Um banco de dados SQL compatível, como MySQL.

## Instalação Node.js e TypeScript no Linux

1. #### Atualizar os pacotes
   - Sempre comece atualizando o índice de pacotes do sistema:
   ```bash
   sudo apt update
   ```
2. #### Adicionar o repositório do Node.js 20
   - Adicione o repositório que contém a versão 20 do Node.js:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    ```
3. #### Instalar o Node.js 20
   - Agora, instale o Node.js versão 20:
    ```bash
    apt-get install nodejs -y
    ```
4. #### Verificar a instalação
   - Verifique se o Node.js foi instalado corretamente:
    ```bash
    node -v
    ```
    - Deve mostrar a versão 20 do Node.js.

5. #### Instalar o Yarn
   - Para instalar o Yarn, primeiro adicione o repositório do Yarn:
   ```bash
   curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
   echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee
   /etc/apt/sources.list.d/yarn.list
   ```
   - Em seguida, atualize os pacotes e instale o Yarn:
   ```bash
   sudo apt update && sudo apt install yarn
   ```
6. #### Verificar a instalação do Yarn
   - Após a instalação, verifique se o Yarn foi instalado corretamente:
   ```bash
    yarn -v
   ```
7. #### Instalar o TypeScript via Yarn
    - Agora, instale o TypeScript globalmente usando o Yarn:
    ```bash
    yarn global add typescript
    ```
8. #### Verificar a instalação do TypeScript
    - Por fim, verifique se o TypeScript foi instalado corretamente com o comando:
    ```bash
    tsc -v
    ```

## Instalação e configuração

1. #### Clonar o repositório
   - Clone o repositório do projeto para sua máquina local usando o seguinte comando:
   ```bash
   git clone https://github.com/Alana-Rocha/sgbc-crud.git
   cd sgbc-crud
   ```
2. #### Instalar dependências
   - Navegue até o diretório do projeto e instale as dependências com o Yarn:
   ```bash
   yarn install
   ```
3. #### Configurar banco de dados
   - Criar Arquivo `.env` no Linux dentro de cd ./sgbc-crud/ com o comando:
   ```bash
   touch .env
   ```
   - Edite o arquivo para adicionar as variáveis de ambiente necessárias:
   ```bash
   nano .env
   ```
   - Exemplo de conteúdo:
   ```makefile
   HOST=""
   PORT=""
   DATABASE=""
   PASSWORD=""
   USR=""
   ```
   -	Preencha as variáveis de ambiente com os dados corretos de conexão com o banco de dados.
4. #### Iniciar o servidor de desenvolvimento
  - Após configurar o banco de dados e as dependências, você pode iniciar o servidor de desenvolvimento:
   ```bash
   yarn start
   ```
## Arquivos Importantes
  - [package.json](packege.jason): Lista todas as dependências e scripts do projeto.
  - [biome.json](biome.json): Arquivo de configuração do Biome para estilização e linting do código.
  - [.swcrc](.swcrc): Arquivo de configuração do compilador SWC, utilizado para compilar TypeScript rapidamente.
  - [yarn.lock](yarn.lock): Mantém o controle das versões exatas das dependências para garantir que o ambiente seja reproduzível.
  - [.env.example](.env.example): Exemplo de configuração de variáveis de ambiente.


## Link do video no youtube
https://www.youtube.com/watch?v=PJqd1m88EDI
