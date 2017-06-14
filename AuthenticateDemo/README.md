Arrowjs.io Authentication Demo
=====================
## Requirements
To run this example, you need to 


## License

The MIT License (MIT)

## Tải demo
- Chỉ làm 1 lần vì tải về đã tải tất cả các ví dụ rồi.
```
git clone https://github.com/arrowjs/examples.git
cd examples/
```

## Chạy ví dụ
1) Cài đặt node_modules
```
cd AuthenticateDemo
npm i
```

2) Cấu hình CSDL (config/env/development.js)

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

3) Chạy app

```
npm start
```

[http://localhost:8000](http://localhost:8000)


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
 bcrypt                 ^0.8.5  →  ^1.0.2
 passport-google-oauth  ^0.2.0  →  ^1.0.0
 passport-facebook  ^2.0.0  →  ^2.1.1
```
## Workflow
* Example AuthenticateDemo folder structure 
```bash
.
├── config
├── features
├── package.json
├── README.md
└── server.js
```

### In default, the env is development. We need to change database config in development.js to run app
* 'Authenticate' database with user model as in user.js is automatically created
* **Question**: which part in Arrowjs handles this behaviour?
### Server.js creates an instance of ArrowApplication and runs method start()

* We test Authentication so the settings input passed to start() is  `{passport :true}` - Use Passport for Authentication

#### In `app.start({passport :true})`:
##### Running `configureExpressApp(app, config, setting)` to load express config in file config/express.js encounters some below errors :
* TypeError: helmet.xframe is not a function => Newer version of middleware helmet, function xframe is now called frameguard
* helmet.nosniff() => helmet.noSniff(), helmet.ienoopen() => helmet.ieNoOpen()

#### Only one feature - folder index
* feature.js registers the index feature
* route.js registers all related routes
* Firstly, index.js is read but not yet invoked 
```js
=========IN INDEX.JS BEFORE================
{}
=========AFTER SETTING HANDLERS OF THIS CONTROLLER===
{ loginView: [Function],
  createView: [Function],
  create: [Function],
  index: [Function] }
=========END INDEX.JS=======
```
* Secondly, route.js is read to assign all routes and their handlers 
```js
=========IN ROUTE.JS================
// component input
{ name: 'index',
  _path: '/home/linh/Techmaster/examples/AuthenticateDemo/features/index',
  _configFile: '/home/linh/Techmaster/examples/AuthenticateDemo/features/index/feature.js',
  _strucID: '0',
  _structure:
   { path: [ [Function: makeGlob] ],
     model: { path: [Object], type: 'single' },
     view: { path: [Object], type: 'single' },
     controller: { path: [Object], type: 'single' },
     route: { path: [Object], type: 'single' } },
  controllers:
   { loginView: [Function],
     createView: [Function],
     create: [Function],
     index: [Function] },
  routes: {},
  models: { user: user },
  views:
   [ { func: [Function: makeGlob],
       base: '/home/linh/Techmaster/examples/AuthenticateDemo/',
       fatherBase: '/home/linh/Techmaster/examples/AuthenticateDemo/features/index' } ],
  actions: {},
  title: 'Index Module',
  author: 'Tran Quoc Cuong',
  version: '0.1.0',
  description: 'Hello Arrowjs',
  permissions: [] }
  // application input
  ArrowApplication {.....}
=========END READING ROUTE.JS=======
```
#### Passport structure:
* Main passport setup is in /config/passport.js with serializeUser(), deSerializeUser(), etc. and passport strategies config
* Details of each strategy are in /config/strategies/ => in this case, local.js uses LocalStrategy()

#### Access http://localhost:8000/create - Create a new account
* models/user.js register user model in database
* controller.create handles the signing up process with passport and bcrypt modules
* After success registration, the web is automatically redirected to http://localhost:8000/login

#### Access http://localhost:8000/login
* Send post request to submit login form - What is authenticate: 'local1'? 

```js
  "/login" : {
      get : {
        handler : component.controllers.loginView
      },
      post : {
        authenticate: 'local1' // 'local1' must be string
      }
```

* When post authentication request is sent, local1 is called -> authentication passport strategy is local (strategies/local.js) -> after running local.js, redirect to '/' or '/login'
```js
// In config/passport.js,  line 31
    local1: {
      strategy : 'local',
      option: {
        successRedirect: '/',
        failureRedirect: '/login'
      }
    },
```
* **Bug:** Failure message does not display and also username is not yet passed to html after logging in   => allow failureFlash and pass data to html during rendering 
* failure flash messages are stored in `req.session.flash.error`
```js
    local1: {
      strategy : 'local',
      option: {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true // allow flash messages
      }
    },
```

#### http://localhost:8000/ is only accessible after success authentication 
* Access ok and index.twig is rendered but username data is not passed through => Fixed
* get request to '/' will invoke checkAuthenticate() in /config/passport.js => redirect to '/login' if not authenticated

#### Arrowjs Core also have middleware flashMessage in config/middleware/flashMessage.js to setup different types of flash messages