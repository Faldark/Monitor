#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM node:12.16.1-alpine AS client



RUN npm install -g @angular/cli@9.1.5

WORKDIR /app
ENV PATH /node_modules/.bin:$PATH
EXPOSE 4200
CMD ["npm", "start"]
