# carpark
The application is a simulation of a robot operated bus moving in a carpark, of dimensions 5 units x 5 units.

There are no other obstructions in the carpark. The bus is free to roam around the carpark, but must be prevented from exiting the carpark. Any movement that would result in the bus leaving the carpark must be prevented, however further valid movement commands must still be allowed.

The application should be able to read in any one of the following commands:

#### PLACE X,Y,F
#### MOVE
#### LEFT
#### RIGHT
#### REPORT
- **PLACE** will put the bus in the carpark in position X,Y and facing **NORTH**, **SOUTH**, **EAST** or **WEST**.
- The origin (0,0) can be considered to be the **SOUTH WEST** most corner.
- The first valid command to the bus is a **PLACE** command, after that, any sequence of commands may be issued, in any order, including another **PLACE** command. The application should discard all commands in the sequence until a valid **PLACE** command has been executed.
- **MOVE** will move the bus one unit forward in the direction it is currently facing.
- **LEFT** and **RIGHT** will rotate the bus 90 degrees in the specified direction without changing the position of the bus.
- **REPORT** will announce the X,Y and F of the bus. Example:
- A bus that is not in the carpark should ignore the **MOVE**, **LEFT**, **RIGHT** and **REPORT** commands.
- Input can be from a file, or from standard input, as the user chooses.

Examples:  
a)  
PLACE 0,0,NORTH  
MOVE  
REPORT  

**Output:** 0,1,NORTH  

b)  
PLACE 0,0,NORTH  
LEFT  
REPORT  

**Output:** 0,0,WEST

c)  
PLACE 1,2,EAST  
MOVE  
MOVE  
LEFT  
MOVE  
REPORT  

**Output:** 3,3,NORTH

---
## Getting started
### Tech Stack
This application is based on the following tools/libraries:
- UI Render: **React/Redux, SASS**.
- Bundler: **Webpack**.
- Lint check: **ESlint, eslint-config-airbnb**.
- E2E Testing: **Protractor, Chrome**.
- Unit Testing: **Jasmine, Enzyme, Karma**.
- Web Server: **Express**.

### Setup
1. Clone the project from Git repo.
2. Make sure you have node installed (install Node.js LTS v6.X.X, NPM 3.X).
3. Switch to top level directory.
4. `npm install` (Install necessary npm packages).

---
## Development Mode:

### Run dev mode
Dev mode enables [webpack-dev-middleware](https://webpack.js.org/guides/development/#using-webpack-dev-middleware), will cause `Webpack` to compile files in-memory - code changes are saved and updated when refreshing page in browser.

1. Switch to top level directory.
2. `npm run start:dev` to start web server.
3. Go to browser and hit http://localhost:3000/carpark to launch.

### Unit tests
Specs for Unit Test all locate `tests/unit` of each package and are written in `Jasmine`, executing via `Karma` on `phantomJS`. Code coverage is run by `karma` plugins.

1. Switch to top level directory.
2. Run `npm run test:unit` to start the Unit Test.
3. Review `tests/out/unit` for UT reports.
4. Review `tests/out/coverage` for UT coverage reports.

### E2E tests (for testing CMDs)
`Protractor` is included for E2E testing, allows for JS based automation tests using familiar `Jasmine` BDD test syntax.

In this application, I use `chrome` as the testing server, so the following steps are necessary:

1. Switch to top level directory.
2. Run `npm run update:webdriver` to install chromedriver.
3. Run `npm run test:e2e` to start the E2E testing.
4. Review `tests/out/e2e` for testing reports.

#### Static Analysis (Eslint)
All projects are covered with `eslint` rules to ESS standard in `eslint-config-airbnb`, [details](https://github.com/airbnb/javascript)

Run `npm run check:lint` to do the lint check.

---
## Production Mode:

### Run prod mode
1. Switch to top level directory.
2. Run `npm run build` (to pack web files via Webpack and convert JS into ES5 via Babel).
3. Run `npm start` (to start web server in prod mode).
4. Go to browser and hit http://localhost:3000/carpark to launch.

---
## Deployment
`Docker` is introduced for deployment. It provides a way to run applications securely isolated in a container, packaged with all its dependencies and libraries.

### Create local docker image
1. Install Docker via https://www.docker.com/community-edition#/download.
2. Switch to top level directory.
3. Run `npm install` (to install necessary npm packages).
4. Run `npm run build` (to pack web files via Webpack and convert JS into ES5 via Babel).
5. Run `docker build -t carpark .` to create docker image.
6. Run `docker run --name carpark -p 3000:3000 -d carpark ` to start the container.
7. Go to browser and hit http://localhost:3000/carpark to launch.
