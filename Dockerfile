FROM debian:latest

WORKDIR /var/www/html

RUN apt-get update
RUN apt-get install -y curl gnupg nginx net-tools
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs 
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN npm install obs-websocket-js --save

CMD service nginx start

COPY source /var/www/html