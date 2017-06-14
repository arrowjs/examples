Nunjucks features
==================
Arrowjs.io uses Nunjucks view template engine.
Key features of Nunjucks:

1. Support inherit, include, import template, macro
2. Logic: if, for
3. Customed filter
4. Async call
5. Precompile template

See more about [Nunjucks](https://mozilla.github.io/nunjucks/)


## Chạy ví dụ
1) Cài đặt node_modules
```
cd Nunjucks
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


