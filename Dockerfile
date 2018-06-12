FROM debian:latest

WORKDIR /root/test

RUN apt-get update
RUN apt-get install -y curl gnupg nginx net-tools git
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs 
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
#RUN cd /var/www/html && npm install obs-websocket-js --save
RUN npm install -g bower
RUN cd /var/www/html && bower install --allow-root obs-websocket-js --save

CMD service nginx start

COPY source /var/www/html