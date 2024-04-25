#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/capstone-crud/deploy.log

echo 'cd /home/ec2-user/capstone-crud' >> /home/ec2-user/capstone-crud/deploy.log
cd /home/ec2-user/capstone-crud >> /home/ec2-user/capstone-crud/deploy.log

echo 'npm install' >> /home/ec2-user/capstone-crud/deploy.log 
npm install >> /home/ec2-user/capstone-crud/deploy.log