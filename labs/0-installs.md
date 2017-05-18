# Lab 0: Installs


Detailed instructions and link are in labs/0-installs.md

Time: 15 minutes to download and install, go! 🚀


# Task

You must have the following items:

* Slides, labs and code  <https://github.com/azat-co/node-in-production>
* Node and npm (v6 and v4)
* Docker engine
* AWS account
* AWS CLI

# Walk-through

If you would like to attempt the task, skip the walk-through and go for the task directly. However, if you need a little bit more hand holding or you would like to look up some of the commands or code or settings, then follow the walk-through.

## 1. Slides, labs and code

Open this link in your browser <https://github.com/azat-co/node-in-production> and click on the green button which says "Download".


Alternatively, use Git clone (you can fork first too):

```
git clone https://github.com/azat-co/node-in-production.git
```

Or download with CURL and unzip (create a new folder):

```
curl  https://codeload.github.com/azat-co/node-in-production/zip/master | tar -xv
```

## 2. Node and npm


To install Node v6, you official installer ([link](https://nodejs.org/en/download)) or nvm (recommended).

To install nvm (node version manager), run this script:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

Then run one of nvm commands such as:

```
nvm install node
```

Keep in mind that after installing and/or switching between version with nvm, you might have to restart your terminal session (depends on your PATH settings).

Check Node and versions with:

```
node --version
npm --version
```

You need to have Node v6 or v8 and npm v4+.

## 3. Docker engine

Next, you would need to get the Docker engine (deamon). If you are a macOS user like I’m, then the easiest way is to just go to the official Docker website <https://docs.docker.com/docker-for-mac>.

If you are not a macOS user, then you can select one of the options from this page: <https://docs.docker.com/engine/installation>.


To verify installation, run

```
docker version
```

It's good if you see something like this:

```
Client:
 Version:      17.03.1-ce
 API version:  1.27
 Go version:   go1.7.5
 Git commit:   c6d412e
 Built:        Tue Mar 28 00:40:02 2017
 OS/Arch:      darwin/amd64

Server:
 Version:      17.03.1-ce
 API version:  1.27 (minimum version 1.12)
 Go version:   go1.7.5
 Git commit:   c6d412e
 Built:        Fri Mar 24 00:00:50 2017
 OS/Arch:      linux/amd64
 Experimental: true
```

Next step is to verify that Docker can pull from Hub. Run this hello world image:

```
docker run hello-world
```

If you see a message like this most likely you didn’t start Docker:

```
Cannot connect to the Docker daemon. Is the docker daemon running on this host?
```

Start Docker. If you used macOS, you can utilize the GUI app. Otherwise, CLI.

This is how running Docker daemon looks on my macOS:

![](../images/docker-running.png)


On the contrary, if you see a message like the one below, then deamon is running and you are ready to work with Docker!

```
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world

c04b14da8d14: Pull complete
Digest: sha256:0256e8a36e2070f7bf2d0b0763dbabdd67798512411de4cdcf9431a1feb60fd9
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.


To generate this message, Docker took the following steps:
...
```

## 4. AWS account


You can easily get a free (trial) AWS account. You'll need a valid email and a credit card. Read about the free tier at <https://aws.amazon.com/free/> and when you are ready, sign up by clicking on "CREATE A FREE ACCOUNT".


Once you are in, make sure you can access EC2 dashboard. Sometimes AWS requires a phone call or a waiting period. Most people can get an account within 10 minutes.

![](../images/aws-ec2.png)


## 5. AWS CLI


Check for Python. Make sure you have 2.6+ or 3.6+. You can use pip (Python package manager) to install AWS CLI.

```bash
phyton --version
pip --version
pip install awscli
```

Install AWS CLI for EL Capitan users:
```bash
sudo -H pip install awscli --upgrade --ignore-installed six
```

Python at least 2.6.5 or 3.x (recommended), see here: <http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html>. At <https://www.python.org/downloads/> you can download Python for your OS.


## Other AWS CLI Installations

* [Install the AWS CLI with Homebrew](http://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html#awscli-install-osx-homebrew) - for macOS
* [Install the AWS CLI Using the Bundled Installer (Linux, macOS, or Unix)](http://docs.aws.amazon.com/cli/latest/userguide/awscli-install-bundle.html) - just download, unzip and execute

## Verify AWS CLI

Run the following command to verify AWS CLI installation and its version (1+ is ok):

```bash
aws --version
```
