
# <span>Shops.io</span>

>React application that allows the users to look for shops within a set radius.

This is my submission for the Hidden Founders' web coding challenge.

## Usage

First, you must signup or login if you have already signed up.

Signup :

![Signup example](https://gyazo.com/ee2c26939ab4562ccb769a883ecfe9b1.gif)

Login :

![Login example](https://gyazo.com/73056e955be911a2a9c0c7479d8ca3c2.gif)

The main page displays the nearby shops sorted by distance. You can use the search radius dropdown menu to narrow search results. 
* **Note** : Leaving the dropdown menu at its default selection means setting a search radius of 1000 km (Large enough to display all the shops in the database)

![Nearby Shops Page](https://gyazo.com/1dfc9e71bffaf8b32f1c8c97e22d7083.gif)

You can like a shop. Liked shops are not displayed on the main page.

![Like example](https://gyazo.com/3eeb6c5fe33e94053431df108670d71d.gif)

You can dislike a shop so that it won't appear in the nearby shops for 2 hours.

![Dislike example](https://gyazo.com/c1227fe9de43a2eb890b5291457b18e9.gif)

You can display your preferred shops in the preferred shops page and you can remove a shop from your preferred shops list.

![Preferred Shops Page](https://gyazo.com/0f525f47cfcf8b6ab5dcdfe1c6a8500d.gif)

## How to install

Make sure you have [MongoDB](https://docs.mongodb.com/manual/installation/) installed.

And if you don't have *yarn* installed, go ahead and install it.

From npm:

  ```

npm install yarn -g

```

Then in the root folder run:
```

yarn

```
Download the MongoDB dump that contains the shops database [here](https://github.com/hiddenfounders/web-coding-challenge/blob/master/dump-shops.zip), extract it and then run the following command
```

mongorestore --db shops shops/

```
Start the mongod process by running the following command
```

mongod.exe

```
To run the app first start the server by running this command in the root folder
```

yarn api

```
You can run the client on the dev server using the following command
```

yarn start

```
Or you can skip it and run the client on the production server by running
```

yarn build

```
## Known Issues

On refreshing the nearby shops page the search radius selectpicker renders two dropdowns menus. Going to the preferred shops page and returning to the nearby shops page doesn't have the same effect.