#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/capstone-crud/deploy.log
# nodejs-app is the same name as stored in pm2 process
echo 'pm2 restart react-app' >> /home/ec2-user/capstone-crud/deploy.log
pm2 restart react-app >> /home/ec2-user/capstone-crud/deploy.log

echo 'pm2 restart server' >> /home/ec2-user/capstone-crud/deploy.log
pm2 restart server >> /home/ec2-user/capstone-crud/deploy.log