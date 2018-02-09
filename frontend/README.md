# Eaze Test Project: Wordpress REST API Client
This project was built as a test project by [Juan Villalobos](http://juanvillalobos.me) for Eaze. It pulls post data from a Wordpress site using the REST API, built into the CMS.

This repo includes the react application client only. I was originally going to include the Wordpress install with this project, but felt it wasn't necessary as I didn't need to write any custom Wordpress code to complete this project task. I believe this is a testament to the utility of the Wordpress REST API as it works straight out of the box for any Wordpress install. In a more complex project, I could write custom Wordpress code for several uses including:

*  Custom REST endpoints
*  Custom post types for more complex data
*  Custom editor fields, options and styles for a better backend user experience

Below you will find instructions on how to setup the development environment to be used on your local machine as well as more details about the client.

## Tools Used

*  React 16.2.0
*  React Router 4.2.2
*  Wordpress
*  MAMP (for localhost Wordpress install)

## Running the Project
To run this project, you will need to do two things:

1.  Install Wordpress on local host
2.  Run the Client

### Wordpress install
I did not include a Wordpress install in this repo as this would be more difficult to setup for anyone running this project on their own machine, as you would have to import the database, updated Wordpress' config file, and update URL's across the install if you use any server besides `localhost:8888`. Instead, the simplest way to setup the Wordpress install is actually to install a fresh version and simply add the articles.

Rather than regurgitate all the steps to installing Wordpress, I've provided a link to [install Wordpress here](https://codex.wordpress.org/Installing_WordPress_Locally_on_Your_Mac_With_MAMP) and Wordpress can be downloaded directly from [here](https://wordpress.org/download/). I used MAMP to create an apache server at `localhost:8888`. You can download [MAMP here](https://www.mamp.info/en/) if needed.

Once you have installed Wordpress, add the articles that were provided. I've added those links here for convenience:

*  [Article 1](https://github.com/eaze/cms-exercise/blob/master/articles/article_1.md)
*  [Article 2](https://github.com/eaze/cms-exercise/blob/master/articles/article_2.md)
*  [Article 3](https://github.com/eaze/cms-exercise/blob/master/articles/article_3.md)

### Run client
The React client expects a Wordpress install at `localhost:8888` in order to make the correct call to the REST API. If you are running your Wordpress at any other server address, simply open `src/App.js` and change the value below to match the new server address.
```javascript
const SERVER = 'http://localhost:8888'
```
Finally, after you have made necessary updates, simply run the following commands in the project directory:
```
$ npm install
$ npm start
```
