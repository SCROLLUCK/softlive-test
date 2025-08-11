# CRUD de Produtos - Frontend

## Desenvolvedor

**Nome:** Lucas de Lima Castro  
**Contato:**

- Email: lucasluck77.ll@gmail.com
- Telefone: (92) 99352-2155

## Descrição do Projeto

Interface gráfica de CRUD (Create, Read, Update, Delete) de produtos, desenvolvida como teste técnico. A aplicação permite gerenciar produtos com operações básicas de cadastro, listagem, edição e exclusão.

## Funcionalidades

- **Listagem de Produtos**: Exibe todos os produtos cadastrados em formato de tabela.
- **Adição de Produtos**: Formulário com validação para cadastrar novos produtos.
- **Edição de Produtos**: Permite atualizar informações de produtos existentes.
- **Exclusão de Produtos**: Remove produtos com confirmação via modal.
- **Validação de Campos**: Garante que os dados inseridos sejam válidos.

## Tecnologias Utilizadas

- **UI:** Shadcn UI (componentes estilizados e acessíveis)
- **Framework:** Vite + React 19.0.1
- **Linguagem:** TypeScript
- **API:** MockAPI.io (simulação de backend)
- **Deploy:** Vercel

## Links Importantes

- **Repositório no GitHub:** [https://github.com/SCROLLUCK/softlive-test](https://github.com/SCROLLUCK/softlive-test)
- **Deploy na Vercel:** [https://softlive-test-euth.vercel.app/](https://softlive-test-euth.vercel.app/)
- **Mock API:** [https://68929015c49d24bce867d02c.mockapi.io/softlive-test/products](https://68929015c49d24bce867d02c.mockapi.io/softlive-test/products)

## Tempo de Desenvolvimento

**Total:** 10 horas

## Como Executar Localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/SCROLLUCK/softlive-test.git
   cd softlive-test
   ```

2. **Crie o arquivo de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```
   VITE_API_URL=https://68929015c49d24bce867d02c.mockapi.io/softlive-test
   ```

3. **Instale as dependências:**

   ```bash
   yarn
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   yarn start
   ```

5. **Acesse a aplicação:**
   Abra o navegador e visite [http://localhost:5173](http://localhost:5173).

## Scripts Disponíveis

- `yarn start`: Inicia o servidor de desenvolvimento.
- `yarn build`: Gera os arquivos otimizados para produção.
- `yarn preview`: Previsualiza a build de produção localmente.
- `yarn lint`: Executa análise estática do código com ESLint.

## Observações

- A aplicação utiliza **Shadcn UI** para componentes estilizados e responsivos.
- A API mockada ([MockAPI.io](https://mockapi.io)) simula um backend real, armazenando os produtos cadastrados.
- O deploy foi realizado na **Vercel** para acesso público.
- É necessário criar o arquivo `.env` com a variável `VITE_API_URL` para o correto funcionamento local.

Para dúvidas ou sugestões, entre em contato pelo email: **lucasluck77.ll@gmail.com**.
