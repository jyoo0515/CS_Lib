#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/cslib
cd $REPOSITORY

echo "> Start"
docker kill $(docker ps -q)
docker-compose build
docker-compose up -d