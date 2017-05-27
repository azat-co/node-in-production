```
docker build -f ./DockerfileDev .

docker run -v ./:/usr/src/app {image-id}

docker run --rm -it --net=my-network --name mongod-banking-api-prod-container mongo

docker start 907293ddf60225256f91f5b74665d97aca10b7e19623a00dbc085cf04f63276f

docker network create --driver=bridge my-network
docker network inspect my-network
docker network ls
docker ps -a.

127.0.0.1

ifconfig |grep inet


docker run --rm -t --net=my-network --name banking-api -e NODE_ENV=development -e DB_URI="mongodb://10.0.1.3:27017/db-prod" -p 80:3000 be327d49c00d

docker run --rm -t --net=my-network --name banking-api -e NODE_ENV=production -e DB_URI="mongodb://mongod-banking-api-prod-container:27017/db-prod" -p 80:3000 19ee336131c6

docker run --rm -t --net=my-network --name banking-api -e NODE_ENV=production -e DB_URI="mongodb://mongod-banking-api-prod-container:27017/db-prod" -p 80:3000 be327d49c00d
```

https://blog.csainty.com/2016/07/connecting-docker-containers.html
http://www.howtofindmyipaddress.com/
