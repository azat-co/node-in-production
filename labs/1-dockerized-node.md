# Lab 1: Dockerized Node



# Task

Server an HTML page from S3


# Walk-through

If you would like to attempt the task, go skip the walk-through and for the task directly. However, if you need a little bit more hand holding or you would like to look up some of the commands or code or settings, then follow the walk-through.

1.

## 1. Create 2 instances

```

npm init -y
npm i express -SE
```


# Troubleshooting

## Create a new project folder

```
mkdir banking-api
cd banking-api
touch Dockerfile
```

---

## Compose Dockerfile

Must be exactly `Dockerfile`- no extension and starts with capitol letter D

Write in banking-api/Dockerfile base image node v6 from Alpine:


## Create app directory

```
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
```

---

## Install app dependencies

```
COPY package.json /usr/src/app/
RUN npm install
```

---

## Bundle app source

```
COPY . /usr/src/app
```

---

## Open port and start server

```
EXPOSE 3000
CMD [ "npm", "start" ]
```

---
