Microservice example
==================
In this example, an Arrowjs web application gets RSS feed from 03 ways:

1. Use [request](https://www.npmjs.com/package/request) and [feedparser](https://www.npmjs.com/package/feedparser) to fetch RSS at [this link](http://vnexpress.net/rss/the-gioi.rss)
2. Call to remote [socket server](http://www.actionherojs.com/docs/#socket-server) powered by [ActionHero](http://www.actionherojs.com/)
3. Call to web service powered by ActionHero

## Chạy ví dụ

1- Consumer

```
cd Consumer/
npm install
node server.js
```
2- ActionHero

```
cd Actionhero
npm install
npm start
```

3) Chạy app

```
npm start
```

[http://localhost:8000](http://localhost:8000)

In Consumer\features folder there are 03 features:

1. local: fetch RSS and parse directly in Arrowjs
2. remoteSocket: call to socket server at `127.0.0.1:5000`
3. remoteWeb: call to web server at `http://localhost:8080/api/getRSS`

##Experiment
Without running ActionHero server, try to run Consumer application



