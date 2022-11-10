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
### Docker
## Set Up
### Using docker-compose
### Checking everything is working

## Getting Started

### Where To Begin
### Sanity Checks
### Some Example Tasks
## Troubleshooting/Problems
### Reporting bugs