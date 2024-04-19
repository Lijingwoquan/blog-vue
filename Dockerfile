FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# /etc/nginx/nginx.conf
COPY /ssl/scs1713452660940_liuzihao.online_server.crt /etc/nginx/ssl/certs/server.crt
COPY /ssl/scs1713452660940_liuzihao.online_server.key /etc/nginx/ssl/private/server.key
EXPOSE 80
EXPOSE 443