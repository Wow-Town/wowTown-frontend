#!/bin/bash

docker-compose down

docker rmi devconf5296/wowtown_frontend:0.1

docker-compose up -d