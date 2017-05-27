# Lab 4: Static Website Rule!


# Task

Deploy two containers (API and DB) which connect using ECR and EC2 ECS.

Time to finish: 15 min ☁️


# Walk-through

If you would like to attempt the task, then skip the walk-through and go for the task directly. However, if you need a little bit more hand holding or you would like to look up some of the commands or code or settings, then follow the walk-through.

Steps to deploy a two-container project (app + database):

1. Create registry (ECR)
1. Upload the app image to ECR
1. Create task definition with 2 containers
1. Create a cluster
1. Create a service and run it

# 1. Create registry (ECR)

Each image needs to be uploaded to a registry before we can use it to run a container. There is registry from docker: hub.docker.com. AWS provides its own registry service called EC2 Elastic Container Registry (ECR). Let's use it.

Log in to your AWS web console at aws.amazon.com. Navigate to us-west-2 (or some other region, but we are using us-west-2 in this lab) and click on CE2 Container Service under Compute:

![](../images/aws-ecs-1.png)

Then click on Repositories from a lift menu and on a blue button *Create repository*. Then new repository wizard will look like this:

![](../images/aws-ecs-2.png)

Enter the name of your repository for container images. I picked azat-main-repo because my name is Azat:

![](../images/aws-ecs-3.png)

Click next and on Step 2, you will see bunch of commands.


![](../images/aws-ecs-4.png)


Successfully created repository, e.g., my URL is

```
161599702702.dkr.ecr.us-west-2.amazonaws.com/azat-main-repo
```

Next, follow instructions to upload an image (must build it before uploading/pushing).

To install the AWS CLI and Docker and for more information on the steps below, [visit the ECR documentation page](http://docs.aws.amazon.com/AmazonECR/latest/userguide/ECR_GetStarted.html).

**Command 1:** Retrieve the docker login command that you can use to authenticate your Docker client to your registry:

```
aws ecr get-login --region us-west-2
```


**Command 2:** Run the docker login command that was returned in the previous step. For example,

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


**Command 3:**: Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions here. You can skip this step if your image is already built:

```
cd code/banking-api
docker build -t azat-main-repo .
```

You might have done this already in the lab 1 (labs/1-dockerized-node.md). Skip to step 4. If not, then build the app image. The build command should end with a similar looking output:

```
...
Step 13/13 : CMD npm start
> Running in ee5f0fb12a2f
> 91e9122e9bed
Removing intermediate container ee5f0fb12a2f
Successfully built 91e9122e9bed
```


**Command 4:** After the build completes, tag your image so you can push the image to this repository:

```
docker tag azat-main-repo:latest 161599702702.dkr.ecr.us-west-2.amazonaws.com/azat-main-repo:latest
```

(No output)


**Command 5:** Run the following command to push this image to your newly created AWS repository:

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

Remember digest (last hash) 📝 Compare digest with one in the repository when you look up your image in the web console in EC2 -> ECS -> Repositories -> azat-main-repo:


![](../images/aws-ecs-5.png)


# 2. Create new Task Definition

Tasks are like run commands in docker CLI (`docker run`) but for multiple containers. Typical tasks define:

* Container images to use
* Volumes if any
* Networks
* Environment variables
* Port mappings

Go to the Task Definitions in EC2 ECS and as you might guess, press on the button which says *Create new Task Definition*:

![](../images/aws-ecs-6.png)


## Main Task settings for the example

Use the following settings for the task to make sure your project is running (because some other values might make the project nonfunctional):

* Two containers: `banking-api` (private AWS ECR) and `mongodb` (docker hub)
* Connect to mongodb via network alias
* Map 80 (host) to 3000 (container) for banking-api
* Set env vars for `NODE_ENV` and `DB_URI`

Let's define the first container — app.

# First container—App

Enter the name: banking-api-container.

Define the image URL (your URL will be different), e.g.,

```
161599702702.dkr.ecr.us-west-2.amazonaws.com/azat-main-repo:latest
```

Define host 80 and container 3000 ports in port mappings. Name, image and ports are shown below:

![](../images/aws-ecs-7.png)

Scroll down in the same modal view and add Env Variables:

```
DB_URI=mongodb://mongod-banking-api-prod-container:27017/db-prod
NODE_ENV=production
```

Add to Links the name of the MongoDB container (not defined yet) to give access to the database container to the app container such as one is the name of the container in the task definition and the other is the host name in the DB_URI:

```
mongod-banking-api-prod-container:mongod-banking-api-prod-container
```

See the screengrab below:

![](../images/aws-ecs-8.png)


# Second container—Database

Analogous to the previous container, define name and URL with these values:

* Name: mongod-banking-api-prod-container
* Image URL: registry.hub.docker.com/library/mongo:latest

![](../images/aws-ecs-9.png)

Scroll down to the hostname in Network settings and enter Hostname as `mongod-banking-api-prod-container` as shown below:

![](../images/aws-ecs-10.png)


After you added two container to the task, create the task and you'll see a screen similar to the one shown below:

![](../images/aws-ecs-10-2.png)


Alternatively, you could specify volumes for database or/and the app at the stage of the task creation.

# 3. Create Cluster

Cluster is the place where AWS runs containers. They use configurations similar to EC2 instances. Define the following:

* Cluster name: `banking-api-cluster`
* EC2 instance type: m4.large (for more info on EC2 type, see [AWS Intro course on Node University](https://node.university/p/aws-intro))
* Number of instances: 1
* EBS storage: 22
* Key pair: None
* VPC: New

![](../images/aws-ecs-11.png)

Launch the cluster. It might take a few minutes.

![](../images/aws-ecs-12.png)

You'll see the progress:

![](../images/aws-ecs-13.png)

ECS creates a lot of EC2 resources for you such as Internet Gateway, VPC, security group, Auto Scaling group, etc. which is great because you don't have to create them manually.

![](../images/aws-ecs-14.png)


# 4. Create Service and Verify

The last step is to create a service which will take the task and the cluster and make the containers in the task run in the specified cluster. It's oversimplified explanation because service will do more such as monitor health and restart containers.

Go to Create Services which is under Task Definition -> banking-api-task -> Actions -> Create Service. You will see this:

![](../images/aws-ecs-15.png)


## Everything is ready

Phew. Everything should be ready by now. To verify, we need to grab a public IP or public DNS. To do so, click Clusters -> banking-api-cluster (cluster name) -> ESC Instances (tab) and Container instance:

![](../images/aws-ecs-16.png)

 Copy public IP or DNS 📝.

## Dynamic Test

To test the dynamic content (content generated by the app with the help of a database), open in browser with `{PUBLIC_DNS}/accounts`. Most likely the response will be `[]` because the database is empty but that's a good response. The server is working and can connect to the database from a different container.


## Static Test

To test the static content such as an image which was downloaded from the Internet by Docker (ADD in Dockerfile) and baked into the image, navigate to http://{PUBLIC_DNS}/node-university-logo.png to see the images with Docker downloaded via `ADD`. Using ADD, you can fetch any data such as HTTPS certificates (from a private S3 for example).

# Terminate Service and Cluster/Instances

Don't forget to terminate your service and instances.  You can do it from the web console.

