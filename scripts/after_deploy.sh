#!/bin/bash

REPOSITORY=/home/ubuntu/cslib
cd $REPOSITORY

docker kill $(docker ps -q)
docker-compose up --build -d
docker system prune -af