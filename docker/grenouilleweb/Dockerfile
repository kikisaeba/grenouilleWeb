FROM nginx:latest

COPY docker/grenouilleweb/nginx.conf /etc/nginx/nginx.conf
COPY docker/grenouilleweb/default.conf /etc/nginx/conf.d/default.conf

COPY dist/grenouilleweb/ /usr/share/nginx/html/
