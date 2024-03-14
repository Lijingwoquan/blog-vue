FROM nginx
COPY dist/ /usr/share/nginx/html/ nginx/default.conf /etc/nginx/conf.d/default.conf