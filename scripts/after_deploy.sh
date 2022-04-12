#!/bin/bash

REPOSITORY=/home/ubuntu/cslib
cd /home/ubuntu
sudo mv -f prod.db $REPOSITORY
cd config
sudo cp .env $REPOSITORY
cd $REPOSITORY
yarn install

docker kill $(docker ps -q)
docker-compose up --build -d
docker system prune -af