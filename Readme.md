# Description
The Request Visualizer is a tool that allows you to visualize requests (and soon responses) from server queries. The Request Visualizer provides two ports:
- Port 3000 - This port is used to access the Request Visualizer's interface by default.
- Port 4000 - This port serves as an API endpoint where requests can be sent to the Request Visualizer.

Additionally, the Request Visualizer has the ability to forward requests to another server and send the responses from that server back to the client.

# Installation
First of all, clone the repository and then navigate to the RequestVisualizer directory:
````shell
git clone https://github.com/cEhlers88/RequestVisualizer.git
cd RequestVisualizer
````
Now you can choose between two methods to start the Request Visualizer:
## Method 1: Using docker
````shell
docker build -t request_visualizer .
````
## Method 2: Using local npm
````shell
npm install
npm run build
````

# Configuration
(_Note: If you are using Docker to run the Request Visualizer, you should only change the public ports of the container and not the port settings within the .env-file._)

The configuration of the Request Visualizer is done via the `.env` file. The following configuration options are available: 

- PORT_FRONTEND - The port through which the Request Visualizer's interface can be accessed. 
- PORT_REQUEST_LISTENER - The port through which the Request Visualizer receives requests. 
- PROXY_TARGET - The target URL to which the requests should be forwarded.


# Usage
To start the Request Visualizer, run the following command:
## Method 1: Using docker
````shell
docker run -d -p 3000:3000 -p 4000:4000 request_visualizer
````
## Method 2: Using local npm
````shell
npm start
````