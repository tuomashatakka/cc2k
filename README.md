# CyberCouriers2000
## What is CyberCouriers2000
Cyber Couriers 2000 (CC2K) is a simple turn-based game where you use a REST API to interact and control a drone on a square tile map, with CC2K you are free to showcase your skills and imagination in frontend development using whatever languages and frameworks you desire.

Below you will find an overview of what CC2K is and hopefully, start to put together a vision of how it can be used. If you wish to just get coding, feel free to skip to "Set Up" and "Getting Started"
## Overview
Entering the CC2K world you will be tasked with taking control of a runner drone, picking up and dropping off packages while traversing an obstacle-filled map.
The CC2K world consists of three (3) elements.

- Dynamic Elements - Drones.
- Static Element - Skyscrapers, Safe zones and Drop zones.
- Dumb Elements - Packages
These three (3) elements make up the world you will be interacting with.

### Drones (Dynamic Elements)
Drones are reactive to user input and will need to be constantly monitored.

#### Runner Drones
Runner drones are user-controlled elements in the CC2K world, runner drones can move, pick up, drop off and eject packages.

Runner drones can be controlled directly by the user and move freely around the map on any tile that is not occupied by a Skyscraper.

####  Patrol Drones
Patrol drone's movement cannot be influenced, they will move in reaction to any movement the runner drone makes.

### Map (Static Elements)
Map elements and constant and never changing.

#### Skyscrapers
skyscrapers make up a good portion of the map and cannot be interacted with.

#### Drop-zones
Drop zones are the nodes where packages spawn and travel between.

#### Safe-zones
Safe zones are the safe havens for our runner drones, here they will spawn and be safe from detection. 

### Packages (Dumb Elements)
Packages are "dumb" and they will only move with another object, packages are either stationary on the map or moving while attached to a drone.

#### Sensitive Packages
#### Hardened Packages
### Scoreboard
## Prerequisites 
This self-contained API runs on a multi-container instance that contains both the application and the database, to run the multi-container instance you will need Docker (other solutions are available but have not been tested.)
### Docker
You can acquire and install a copy of docker for personal use for free from the link below.
https://www.docker.com/products/docker-desktop/
## Set Up
### Using docker-compose
Open up a command prompt and navigate to the root of the CC2K repository where the file "CC2K.yml" is located, use the command `docker-compose -f cc2k.yml up` to start the application. 
### Checking everything is working
After you run the docker-compose, you will see some output as it initializes the database with no errors. 
Open up docker-desktop and you should see the multi-container instance running.
Open up a browser and navigate to http://localhost:8000/swagger/index.html where you should be greeted by the swagger UI.
From here you are free to query the database.
### Sanity Checks
Endpoint: (GET) ~/API/drones - returns 4 patrol drones.
Endpoint: (GET) ~/API/map - returns 80 skyscrapers, 4 safe zones and 9 drop zones

## Getting Started
### Where To Begin
### Some Example Tasks
## Troubleshooting/Problems
### Reporting bugs
Nothing is perfect and always open to improvement, we welcome you to break our API and report any findings to your solita contact person (firstname.surname@solita.fi).
### Know Bugs
- Docker compose does not currently work with Apple M1 and M2 chips.
