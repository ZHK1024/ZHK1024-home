FROM nginx:alpine
COPY ./_site/ /usr/share/nginx/html
EXPOSE 8082