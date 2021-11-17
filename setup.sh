#!/bin/bash
#Filename: create_db.sh

#Description: Create MySQL database and table

PASS="" MAINDB="todoApp"

echo "Creating the database"
mysql -e "CREATE DATABASE IF NOT EXISTS ${MAINDB} /*\!40100 DEFAULT CHARACTER SET utf8 */;"
mysql -e "CREATE USER ${MAINDB}@localhost IDENTIFIED BY '${PASS}';"
mysql -e "GRANT ALL PRIVILEGES ON ${MAINDB}.* TO '${MAINDB}'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "Starting server"
cd /src/main/java/todo.todoapp
java TodoAppApplication.java
cd -
cd /angularClient/angularclient
echo "Installing dependencies"
npm install
echo "Starting client"
npm run start