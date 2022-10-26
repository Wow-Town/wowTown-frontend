FROM nginx:stable-alpine

RUN mkdir -p /etc/nginx/key
CMD ["chown", "-R", "root:root /etc/nginx/key"]
CMD ["chmod", "-R" ,"600 /etc/nginx/key"]

RUN mkdir -p /etc/nginx/crt
CMD ["chown", "-R", "root:root /etc/nginx/crt"]
CMD ["chmod", "-R" ,"600 /etc/nginx/crt"]

COPY ./build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 443
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]