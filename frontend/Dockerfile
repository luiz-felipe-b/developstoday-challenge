# Etapa 1: Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Etapa 2: Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Etapa 3: Copie os arquivos package.json e package-lock.json (ou yarn.lock) para dentro do contêiner
COPY package.json package-lock.json ./

# Etapa 4: Instale as dependências
RUN npm install --production

# Etapa 5: Copie todos os arquivos da aplicação para dentro do contêiner
COPY . .

# Etapa 6: Compile a aplicação Next.js para produção
RUN npm run build

# Etapa 7: Exponha a porta 3000 (porta padrão do Next.js)
EXPOSE 3000

# Etapa 8: Inicie a aplicação em modo de produção
CMD ["npm", "start"]
