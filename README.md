# Umayrs News API

An API for viewing news and articles built using Node.js, Postgres, Knex, and Express. This is a work in progress and will soon be functioning site for viewing articles.

Click [here](https://umayrs-news.herokuapp.com/api) to got to my Heroku hosted app! 

## Getting Started

### Step 1 - Install Dependencies

First, you need to install all the necessary dependencies required for this app to work. In your terminal, run the line shown below.

```bash
npm i
```

### Step 2 - Setup The Databases

Once you have the dependencies installed, you can now set up the databases with the following command:

```bash
npm run setup-dbs
```

This command can also be used to reset the databases should anything occur

### Step 3 - Set The Databases To Latest Migration

With the databases initialised, make sure they are set to the latest migration:

```bash
npm run migrate-latest
```

### Step 3.a - If You Need To Rollback Migration

If you need to rollback the migration to the initial version of the database use the following command:

```bash
npm run migrate-rollback
```

### Step 4 - Seeding The Databases

With the databases setup, you can now seed them with the data with the following command:

```bash
npm run seed
```

### Step 5 - Starting The Server

You are now ready to start the server! Use the folllowing command to do this:

```bash
npm run start
```

### Step 5 - Get The Endpoints Info

To find out what endpoints you can use, make a GET request on /api and you will be served a JSON with all the available endpoints on this server.
