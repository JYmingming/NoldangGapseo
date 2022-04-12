
#!/bin/bash
# sudo bash {PATH}/deploy.sh 8080 springproject

# Server Port
# Ex) 8080
SERVER_PORT=$1
# Service Name
# Ex) springproject
PROJECT_NAME=$2

PROJECT_PATH=/var/lib/jenkins/workspace/$PROJECT_NAME/app/build/libs
WAR_FILE=$PROJECT_PATH/app-0.0.1-SNAPSHOT.jar
TMP_PATH_NAME=/tmp/$PROJECT_NAME-pid

# Function
function stop(){
    sudo echo " "
    sudo echo "Stoping process on port: $SERVER_PORT"
    sudo fuser -n tcp -k $SERVER_PORT

    if [ -f $TMP_PATH_NAME ]; then
        sudo rm $TMP_PATH_NAME
    fi

    sudo echo " "
}

function start(){
    sudo echo " "
    sudo echo " server start "
    #sudo nohup java -jar -Dserver.port=$SERVER_PORT $WAR_FILE /tmp 2>> /dev/null >> /dev/null &
    sudo java -jar $WAR_FILE &
    sudo echo " "
}

# Function Call
stop

start
