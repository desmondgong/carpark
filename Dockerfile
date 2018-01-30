############################################################
# Dockerfile to build carpark image
############################################################
# Set the base image to node
FROM node:6.9.4-alpine

################## BEGIN INSTALLATION ######################
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN ls -la /usr/src/app
# Expose the default ports
EXPOSE 3000

##################### INSTALLATION END #####################
CMD [ "npm", "start" ]
