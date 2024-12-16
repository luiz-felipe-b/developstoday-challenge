# Etapa 1: Utilizar a imagem oficial do Node.js
FROM node:16

# Etapa 2: Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Etapa 3: Copiar o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Etapa 4: Instalar as dependências
RUN npm install

# Etapa 5: Copiar o restante dos arquivos do projeto
COPY . .

# Etapa 6: Expor a porta que o Express está escutando
EXPOSE 4000

# Etapa 7: Definir as variáveis de ambiente se necessário
# (Alternativa: você pode passar as variáveis no momento de rodar o contêiner usando --env-file)
ENV PORT=4000
ENV AVAILABLE_COUNTRIES_API=https://date.nager.at/api/v3/AvailableCountries
ENV BORDER_COUNTRIES_API=https://date.nager.at/api/v3/CountryInfo/
ENV FLAG_IMAGES_API=https://countriesnow.space/api/v0.1/countries/flag/images
ENV POPULATION_COUNTRY_API=https://countriesnow.space/api/v0.1/countries/population

# Etapa 8: Rodar o servidor quando o contêiner iniciar
CMD ["node", "index.js"]
