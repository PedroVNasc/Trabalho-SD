#!/bin/bash

clear
docker compose down
docker compose build
docker compose up
