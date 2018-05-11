# web-coding-challenge 

This is a React application that allows the users to look for shops within a set radius.

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

Download the MongoDB dump that contains the shops database [here](https://github.com/hiddenfounders/web-coding-challenge/blob/master/dump-shops.zip),
extract it and then run the following command

```
mongorestore --db shops shops/
```

Start the mongod process by running the following command

```
mongod.exe
```

To run the app first start the server. In the root folder run

```
yarn api
```

To run the client using the dev server

```
yarn start
```

To use the production server

```
yarn build
```