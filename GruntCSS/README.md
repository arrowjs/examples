Grunt UnCSS example
==================
This example shows how to use Grunt to remove unused CSS, them combine and compress to single CSS file.


## Chạy ví dụ
1) Cài đặt node_modules
```
cd GruntCSS
npm i
```

2) Cấu hình CSDL (config/database.js)

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


## Chạy gruntfile.js
1) Cài grunt-cli
```
npm i -g grunt-cli
```

2) Chạy lệnh
```
grunt
```


===================================
## Rerun example and check errors
* I installed and used npm-check-updates module to automatically check all dependencies in package.json and update to their latest versions
```bash
  npm i -g npm-check-updates
  npm-check-updates -u
  npm install
```
* Updates modules
```
grunt                  ^0.4.5  →  ^1.0.1
grunt-contrib-clean    ~0.7.0  →  ~1.1.0
grunt-contrib-copy     ~0.8.0  →  ~1.0.0
grunt-contrib-cssmin  ~0.14.0  →  ~2.2.0
grunt-processhtml      ~0.3.8  →  ~0.4.1
grunt-uncss            ^0.4.4  →  ^0.6.1
load-grunt-tasks       ~3.3.0  →  ~3.5.2
time-grunt             ~1.2.1  →  ~1.4.0
```
## Workflow
* Example GruntCSS folder structure 
```bash
.
├── config
├── features
├── public
├── gruntfile.js
├── package.json
├── README.md
└── server.js
```

##Fix error 'grunt: command not found'
```sudo npm install -g grunt-cli```
