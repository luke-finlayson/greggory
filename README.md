# Greggory

A *"simple"* webapp that allows users to keep track of scores in any game[^1]

### Dependencies

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [MongoDB](https://www.mongodb.com/). To host the database locally, install MongoDB community

### Running locally

1. The Node.js server will need to be able to connect to a MongoDB database. By default it will connnect to `mongodb://localhost:27017`. Edit `database.js` to change this.
2. Clone the repository and run `yarn install` inside the project folder to install all required packages for the server application.
3. Run `yarn start` to start the server application
4. Open a new terminal in the client folder and run `yarn install` again to install the required packages for the frontend
5. Run `yarn start` in the client folder to start the frontend application

[^1]: Does not support monopoly or other complex games that are more than just adding points to a tally (yet)
