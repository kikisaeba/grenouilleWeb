FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf *
RUN apt-get update
RUN apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs 
RUN npm install obs-websocket-js --save

COPY source .