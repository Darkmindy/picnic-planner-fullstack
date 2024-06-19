# Simple template
This is a default template to use as start of your project, using some primary technologies, and linked with MongoDB client-server.

# Table of Contents
- [Simple template](#simple-template)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [No dotenv Installation Required:](#no-dotenv-installation-required)
    - [Setting up .env file](#setting-up-env-file)
    - [Generating Random Keys:](#generating-random-keys)
  - [Initial Setup:](#initial-setup)
- [Used technologies](#used-technologies)
- [NB](#nb)

# Installation

## No dotenv Installation Required:

As long as you have a .env file placed in the root directory of your project, environment variables will be loaded automatically when you execute a script defined in your package.json file. This eliminates the need for manual installation of the dotenv package.

You can access them in any file of your code importing:

    import { env } from "./utility/env";

### Setting up .env file

Create a file named **.env** in the root directory of your project (usually where your package.json file is). Add key-value pairs: Each line represents a variable. The format is KEY=VALUE.
This is how your .env file should looks like:

    MONGODB_URI=mongodb://localhost:"Your port number ex.= 27017, use no quotation mark"/

    ACCESS_SECRET_TOKEN=Random Key, no quotation mark
    REFRESH_SECRET_TOKEN=Random Key, no quotation mark

    LOCAL_DBNAME=this is your local db name 
    DEV_DBNAME=this is your development db name
    PROD_DBNAME=this is your production db name

    LOCAL_PORT="ex. 3***", no quotation mark
    DEV_PORT="ex. 808*", no quotation mark
    PROD_PORT="ex. 808*", no quotation mark

If you want to add any other key to the .env file, make sure you do the same in the env.ts you'll find in the utility folder.

### Generating Random Keys:
To generate random keys to use as ACCESS/REFRESH TOKEN copy this command in your the terminal:

    node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

## Initial Setup: 
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

# Used technologies

* **Mongoose**: a MongoDB object modeling tool that makes working with MongoDB easy and simple. One of its main benefits is that it provides a lot of built-in functionality that makes CRUD operations very easy, such as validation, pre/post hooks and more.

* **Zod**: a simple, lightweight and powerful schema validation library. Its main benefit is that it provides a very intuitive and easy to use API, making it straightforward to define complex validations.

# NB

**MAKE SURE TO REMOVE THE COMMENT ON .env FILES ON THE .gitingnore**