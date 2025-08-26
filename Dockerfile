# Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Le chemin de sortie est dist/examproj selon angular.json
RUN npm run build -- --configuration production

# Stage 2: Serve the application from Nginx
FROM nginx:alpine
# Copier la configuration Nginx personnalisée
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Copier les fichiers buildés depuis le stage 'build'
COPY --from=build /usr/src/app/dist/examproj /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]