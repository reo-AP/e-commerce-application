# Microservices E-Commerce
Implementation of a Microservices Architecture in an E-Commerce Platform. [Reference](https://microservices.io/patterns/data/shared-database.html).

## Tech Stack

 - **Microservices** Architecture with shared database
 - **Node.js** (express) as server side tech at whole services.
 - **MySql** as RDBMS
 - **Sequelize** as Node.js based ORM
 - Manage Queue with **RabbitMq** 
 - **JWT** based Authorization
 - **bcrypt** based Authentication
 - **express-validators** for validating incoming requests

## Steps

 1. Clone this repo
 2. Create new mysql database
 3. Start RabbitMq server
 4. Add env variables for each module (Product, Order and User) as follows

    AMQP_HOST=amqp://localhost;
    DB_USER_NAME=username
    DB_PASSWORD=password
    DB_NAME=dbname
    DB_HOST=localhost
    JWT_KEY=key
    PORT=app port

 5. Run `npm install` and `npm run start` each service directory

