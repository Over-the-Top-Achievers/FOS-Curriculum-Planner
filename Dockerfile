FROM nginx:1.19.6

COPY ./nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./dist/FOS-Curriculum-Planner /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'