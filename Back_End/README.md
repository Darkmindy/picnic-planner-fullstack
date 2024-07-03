# Picnic Planner

A user-friendly web application to simplify picnic planning, aimed at both casual and experienced picnickers.

## <b> **Table of Contents** </b>

-   [Picnic Planner](#picnic-planner)
    -   [ **Table of Contents** ](#-table-of-contents-)
    -   [Installation](#installation)
        -   [No dotenv Installation Required:](#no-dotenv-installation-required)
        -   [Setting up .env file](#setting-up-env-file)
        -   [Generating Random Keys:](#generating-random-keys)
        -   [Initial Setup:](#initial-setup)
    -   [Used technologies (Server side)](#used-technologies-server-side)
    -   [Features](#features)
        -   [ **Documentation** ](#-documentation-)
        -   [ **User API** ](#-user-api-)
        -   [ **Event API** ](#-event-api-)
        -   [ **Friends API** ](#-friends-api-)
        -   [ **Token API** ](#-token-api-)
    -   [Interfaces](#interfaces)
        -   [ User Interface ](#-user-interface-)
        -   [Role Enum](#role-enum)
        -   [ Logout Interface ](#-logout-interface-)
        -   [ Event Interface ](#-event-interface-)
        -   [ RefreshToken Interface ](#-refreshtoken-interface-)
        -   [ Decoded Token Interface ](#-decoded-token-interface-)
    -   [Credits](#credits)

## Installation

### No dotenv Installation Required:

As long as you have a .env file placed in the root directory of your project, environment variables will be loaded automatically when you execute a script defined in your package.json file. This eliminates the need for manual installation of the dotenv package.

You can access them in any file of your code importing:

    import { env } from "./utility/env";

### Setting up .env file

Create a file named **.env** in the root directory of your project (usually where your package.json file is). Add key-value pairs: Each line represents a variable. The format is KEY=VALUE.
This is how your .env file should looks like:

    MONGODB_URI=mongodb://localhost:"Your port number ex.= 27017, use no quotation mark"/

    ACCESS_SECRET_TOKEN=generate random key
    REFRESH_SECRET_TOKEN=generate random key

    PROTECTED_EMAILS=<admin@amin.it> (remove "<>"; could cointains more that one, just separate them with a comma)

    ACCESS_TOKEN_EXPIRATION_TIME=<expiration time of the access token>
    REFRESH_TOKEN_EXPIRATION_TIME=<expiration time of the refresh token>

    LOCAL=local
    DEV=dev
    PROD=prod

    LOCAL_DBNAME=db_local
    DEV_DBNAME=db_dev
    PROD_DBNAME=db_prod

    LOCAL_PORT=3***
    DEV_PORT=808*
    PROD_PORT=808*

**If you want to add any other key to the .env file, make sure you do the same in the env.ts you'll find in the utility folder.**

### Generating Random Keys:

To generate random keys to use as ACCESS/REFRESH TOKEN copy this command in your the terminal:

    node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

### Initial Setup:

Open a terminal in your project directory and run:

    npm install

This command will download and install all the necessary dependencies listed in the package.json file.

**Transpilation (First Time Only):** After the initial installation, run:

    npm run tsc

only once to transpile your TypeScript code into JavaScript. This step is only required the first time you set up the project.

**Running the Server:**

From then on, you can use the single command:

    npm run server

to both transpile your code and start the server using Nodemon. Nodemon will automatically watch for changes in your TypeScript files and restart the server whenever you make modifications, streamlining your development workflow.

## Used technologies (Server side)

-   **Mongoose**: a MongoDB object modeling tool that makes working with MongoDB easy and simple. One of its main benefits is that it provides a lot of built-in functionality that makes CRUD operations very easy, such as validation, pre/post hooks and more.

-   **Zod**: a simple, lightweight and powerful schema validation library. Its main benefit is that it provides a very intuitive and easy to use API, making it straightforward to define complex validations.

-   **Zod-Validation-Error**: a library that simplifies the process of handling validation errors thrown by Zod. It provides a more user-friendly way to deal with errors, making it easier to display them in the UI.

-   **Bcrypt**: a password hashing library that provides a simple and secure way to store passwords in a database. Its main benefit is that it uses a slow and expensive hashing algorithm, making it more secure against brute-force attacks.

## Features

### <b> **Documentation** </b>

Please check the [Documentation](Back_End/Documentation) for an example on how the API calls work; to use them you need to download [Rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

    ext install humao.rest-client

### <b> **User API** </b>

| Feature            | Endpoint           |  Coded?  | PrivateRoutes |
| ------------------ | :----------------- | :------: | :-----------: |
| **Register User**  | POST /signup       | &#10004; |    PUBLIC     |
| **Register Admin** | POST /admin-signup | &#10004; |    PUBLIC     |
| **Login**          | POST /login        | &#10004; |  USER/ ADMIN  |
| **Logout**         | POST /logout       | &#10004; |  USER/ ADMIN  |
| **Get User**       | GET /fetch-user    | &#10004; |    PUBLIC     |

### <b> **Event API** </b>

| Feature            | Endpoint              |  Coded?  | PrivateRoutes |
| ------------------ | :-------------------- | :------: | :-----------: |
| **Add Event**      | POST /add-event       | &#10004; |    PUBLIC     |
| **Update Event**   | PUT /update-event/:id | &#10004; |    PUBLIC     |
| **Delete Event**   | GET /delete-event/:id | &#10004; |    PUBLIC     |
| **Get All Events** | GET /fetch-events     | &#10004; |    PUBLIC     |

### <b> **Friends API** </b>

| Feature           | Endpoint               |  Coded?  | PrivateRoutes |
| ----------------- | :--------------------- | :------: | :-----------: |
| **Add Friend**    | POST /add-friend       | &#10004; |    PUBLIC     |
| **Remove Friend** | GET /remove-friend/:id | &#10004; |    PUBLIC     |

### <b> **Token API** </b>

| Feature           | Endpoint   |  Coded?  | PrivateRoutes |
| ----------------- | :--------- | :------: | :-----------: |
| **Get new Token** | GET /token | &#10004; |    PUBLIC     |

## Interfaces

### <b> User Interface </b>

| Key      | Type             |
| -------- | ---------------- |
| \_id     | ObjectId         |
| name     | String           |
| email    | String           |
| password | String           |
| role     | Enum             |
| isOnline | Boolean          |
| events   | [EventInterface] |
| friends  | [String]         |

### Role Enum

| Value | Description |
| ----- | ----------- |
| 0     | User        |
| 1     | Admin       |

### <b> Logout Interface </b>

| Value | Description |
| ----- | ----------- |
| id    | String      |

### <b> Event Interface </b>

| Key         | Type     |
| ----------- | -------- |
| \_id        | ObjectId |
| title       | String   |
| description | String   |
| location    | String   |
| date        | String   |

### <b> RefreshToken Interface </b>

| Key       | Type           |
| --------- | -------------- |
| token     | String         |
| user      | User Interface |
| createdAt | Date           |

### <b> Decoded Token Interface </b>

| Key | Type   |
| --- | ------ |
| id  | String |

## Credits

This web app was coded and created by [Andrea Risiglione](https://github.com/Andrea-Risiglione), [Bruno Rodriguez Silva](https://github.com/GimbeiNa89), [Fabio Vallacqua](https://github.com/Gowater20) and [Valeria Imbrogio Ponaro](https://github.com/IPVale). With [Matteo Puglisi](https://github.com/ItzJustJouka) and [Stefania Delisio](https://github.com/Darkmindy) as collaborators on cliend side.
