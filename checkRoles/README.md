Arrowjs.io Check Roles Example
=====================

## Run example
1) Setup
```
cd checkRoles
npm i
```

2) Config database (config/env/development.js)

```
db: {
    host: 'localhost',          // host
    port: '5433',               // Cổng 
    database: 'authenticate',   // Tên database
    username: 'postgres',       // username kết nối đến database
    password: 'abc',            // password kết nối đến database
    dialect: 'postgres',        // Nếu sử dụng postgres thì để 'postgres'
    logging: false
},
```

3) Run app

```
npm start
```

[http://localhost:8000](http://localhost:8000)

## License

The MIT License (MIT)

===================================
## Rerun example and check errors
* I installed and used npm-check-updates module to automatically check all dependencies in package.json and update to their latest versions
```bash
  npm i -g npm-check-updates
  npm-check-updates -u
  npm install
```
* Updates modules
```bash
 arrowjs                ^0.3.6  →  ^0.5.0
```
## Workflow
* Example checkRoles folder structure 
```bash
.
├── config
├── features
├── package.json
├── README.md
└── server.js
```

### In default, the env is development. We need to change database config in development.js to run app
* db_name database is automatically created

### Server.js creates an instance of ArrowApplication and runs method start()
* We test Role Access so the settings input passed to start() is  `{role :true}` 

#### In `Application.start({role :true});`:
##### Running `configureExpressApp(app, config, setting)` to load express config in file config/express.js encounters some below errors :
* TypeError: helmet.xframe is not a function => Newer version of middleware helmet, function xframe is now called frameguard
* helmet.nosniff() => helmet.noSniff(), helmet.ienoopen() => helmet.ieNoOpen()
* or just `app.use(helmet());`

#### Only one feature - folder index
* feature.js registers the index feature - with different roles, we set up different permissions 
```js
permissions: [
  {
    name: 'index',
    title: "go to index"
  },
  {
    name: 'about',
    title: "go to about"
  },
  {
    name: 'post',
    title: "go to post"
    }
  ]
```
* In each route, the permission to access the route: 
```js
"/index" : {
  get : {
    handler : component.controllers.index,
    permissions : 'index'
  }
},
```

#### Access http://localhost:8000/
* GET request -> component.controllers.role -> render role.twig (extends from layout.twig)
* At first, we can't access any links in the website since we don't have permissions

```js
// No permission 
req.session.permissions = undefined
```

* To gain permissions, click 'Submit' button -> POST request -> component.controllers.rolePost -> assign req.session.permission -> render role.twig with access to all links
```js
// Gain permission
req.session.permissions = {
  features : {
    index :  [{
      name : "index"
    },{
      name : "about"
    },{
      name : "post"
    }]
  }
}
``` 
