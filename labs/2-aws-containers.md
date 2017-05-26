# Lab 4: Static Website Rule!


# Task

Deploy two containers using ECR and EC2 ECS.

# Walk-through

If you would like to attempt the task, then skip the walk-through and go for the task directly. However, if you need a little bit more hand holding or you would like to look up some of the commands or code or settings, then follow the walk-through.


## 1. Create 2 instances

Terminate instances, remove image, target group and ELB.


# Troubleshooting


## Steps to deploy a two-container app

1. Create registry (ECR)
1. Upload the app image to ECR
1. Create task definition with 2 containers
1. Create a cluster
1. Create a service and run it




![](../images/aws-ecs-1.png)





![](../images/aws-ecs-2.png)




![](../images/aws-ecs-3.png)




![](../images/aws-ecs-4.png)


Successfully created repository, e.g.,

161599702702.dkr.ecr.us-west-2.amazonaws.com/azat-main-repo



To install the AWS CLI and Docker, and for more information on the steps below, [visit the ECR documentation page](http://docs.aws.amazon.com/AmazonECR/latest/userguide/ECR_GetStarted.html).

1) Retrieve the docker login command that you can use to authenticate your Docker client to your registry:

```
aws ecr get-login --region us-west-2
```


2) Run the docker login command that was returned in the previous step. For example,

```
docker login -u AWS -p eyJwYXlsb2FkIjoiQ1pUVnBTSHp
FNE5OSU1IdDhxeEZ3MlNrVTJGMUdBRlAxL1k4MDhRbE5lZ3JUW
...
W5VK01Ja0xQVnFSN3JpaHCJ0eXBlIjoiREFUQV9LRVkifQ==
-e none https://161599702702.dkr.ecr.us-west-2.amazonaws.com
```

Results:

```
Login Succeeded
```



3) Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions here. You can skip this step if your image is already built:

```
cd code/banking-api
docker build -t azat-main-repo .
```



Build will end with a similar looking output:

```
Step 13/13 : CMD npm start
> Running in ee5f0fb12a2f
> 91e9122e9bed
Removing intermediate container ee5f0fb12a2f
Successfully built 91e9122e9bed
```



4) After the build completes, tag your image so you can push the image to this repository:

```
docker tag azat-main-repo:latest 161599702702.dkr.ecr.us-west-2.amazonaws.com/azat-main-repo:latest
```

(No output)


5) Run the following command to push this image to your newly created AWS repository:

```
docker push 161599702702.dkr.ecr.us-west-2.amazonaws.com/azat-main-repo:latest
```


Push output example:

```
The push refers to a repository [161599702702.dkr.ecr.us-west-2.amazonaws.com/azat-main-repo]
9e5134c1ad7a: Pushed
e949bf24b1c4: Pushed
2b5c968a7072: Pushed
858e5e857851: Pushed
10e038bbd0ad: Pushed
ad2f0f4f7c5a: Pushed
ec6eb0ab894f: Pushed
e0380bb6c0bb: Pushed
9f8566ee5135: Pushed
latest: digest: sha256:6d1cd529ced84a6cff1eb5f6cffaed375717022b998e70b0d33c86db26a04c74 size: 2201
```

Remember digest (last hash) 📝 Compare digest with one in the repository




![](../images/aws-ecs-5.png)



# Create new Task Definition

Tasks define:

* Images
* Volumes
* Networks
* Environment variables
* Port mappings



![](../images/aws-ecs-6.png)


# Main settings for the example

* Two containers: banking-api (private AWS ECR) and mongodb (docker hub)
* Connect to mongodb via network alias
* Map 80 (host) to 3000 (container) for banking-api
* Set env vars for `NODE_ENV` and `DB_URI`


# First container

Name: banking-api-container

Image URL: 161599702702.dkr.ecr.us-west-2.amazonaws.com/azat-main-repo:latest



![](../images/aws-ecs-7.png)



![](../images/aws-ecs-8.png)


# Second container

Name: mongod-banking-api-prod-container

Image URL: registry.hub.docker.com/library/mongo:latest

Hostname: mongod-banking-api-prod-container



![](../images/aws-ecs-9.png)



![](../images/aws-ecs-10.png)



![](../images/aws-ecs-10-2.png)


# Create Cluster



![](../images/aws-ecs-11.png)



![](../images/aws-ecs-12.png)



![](../images/aws-ecs-13.png)



![](../images/aws-ecs-14.png)


# Create Service

Task Definition -> banking-api-task -> Actions -> Create Service

![](../images/aws-ecs-15.png)


# Everything is ready

Click Clusters -> banking-api-cluster -> Container instance -> copy public IP or DNS 📝

![](../images/aws-ecs-16.png)


# Dynamic Test

Open in browser with `/accounts`. Most likely the response will be `[]` because the database is empty but that's a good response. The server is working and can connect to the database from a different container.


# Static Test

Navigate to http://{PUBLIC_DNS}/node-university-logo.png to see the images with Docker downloaded via `ADD`. You can fetch any data such as HTTPS certificates.


# Terminate Service and Cluster/Instances
