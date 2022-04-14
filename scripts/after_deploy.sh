#!/bin/bash

REPOSITORY=/home/ubuntu/cslib
cd /home/ubuntu
sudo mv -f prod.db $REPOSITORY
cd config
sudo cp .env $REPOSITORY
cd client
sudo cp .evn $REPOSITORY/client
cd $REPOSITORY

docker kill $(docker ps -q)
docker-compose up --build -d
docker system prune -af