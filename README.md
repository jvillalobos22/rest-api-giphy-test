# Eaze Test Project: Giphy API WordPress Plugin
This project was built as a test project by [Juan Villalobos](http://juanvillalobos.me) for Eaze. It includes a WordPress plugin that allows authors to search for and add
gifs from the [Giphy API](https://developers.giphy.com/) and see those gifs in the
response sent from the WordPress REST API. There is also a front end built using
ReactJS that will show those gifs at the bottom of each article.

## Tools Used

*  React 16.2.0
*  React Router 4.2.2
*  WordPress
*  CMB2
*  jQuery
*  MAMP (for localhost Wordpress install)


## Running the Project
To run this project on your machine, it is assumed that you have a WordPress install
running at ```localhost:8888```. Then, you will need to do two things:

1.  Install the Plugin
2.  Run the Client

### Install the Plugin
To install the plugin, copy the ```wp/wp-content/plugins/giphy-test/``` folder and
paste it into the corresponding plugins folder in your WordPress install. Next, you
will need to go to your admin dashboard at ```localhost:8888/wp-admin```. From here
you should click on ```Plugins``` in the dashboard sidebar. You will set the *GIPHY TEST* plugin in there, but you need to click activate to install the plugin.

Once installed, you can navigate to any post and you will see the custom gif fields
below the editor with instructions on how to add gifs to the post.

### Run the Client
To run the front end, navigate to the ```frontend/``` folder and run the commands:
```
$ npm install
$ npm start
```
This will bring up the React client that will populate the posts. If you click on a
post and scroll to the bottom of that post, you will see all related gifs. If
you have not installed the plugin or added any gifs yet, this will show a "No related gifs" message.
