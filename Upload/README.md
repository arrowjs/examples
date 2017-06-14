# Upload
==================

## Chạy ví dụ
1) Cài đặt node_modules
```
cd Upload
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

## Update packages
```
npm-check-updates -u
// arrowjs      ^0.3.6  →  ^0.5.0
// fs-extra     ^0.26.2 →  ^3.0.1
// formidable   ^1.0.17 →  ^1.1.1
// pg           ^6.2.4
```
```

## Starting the server initially will create a folder public/upload to hold uploaded files

## GET request '/': 
1. Read file contents inside the public/upload -> Empty the directory if listFiles returned from the fs.readDir is undefined  -> console.log('success!') after empty the dir
2. If listFiles is an array of file name in public/upload -> loop through each file to get its file data
3. Pass data to index.twig during rendering 

## POST request '/'
1. Upload file with formidable
2. If the same file is uploaded (same file name)  -> it will replace the existing one in public/upload
* **Bugs:** cannot upload mulitple files -> 'Error: Can\'t set headers after they are sent.' -> FIX: does not redirect to '/' on event 'fileBegin' but add event 'end' after all files are uploaded to the disk in public/upload
```js
  form.on('end', function () {
    console.log('All files uploaded');
    res.redirect('/');
  });
```
## Download files:
1. Download with res.download (express function)
2. Truyền tên file về -> concate with uploadPath to pass in res.download
```js
 res.download('/home/linh/Techmaster/examples/Upload/public/upload/filename.png', function (err) {
    //
 });
```

## Delete files:
1. Delete files với fs.unlink

## Fix error 
- Khi upload nhiều file sẽ bị lỗi _Error: Can\'t set headers after they are sent._ Là do nó liên tục bị redirect
    
    + Old code (trong _features/controller/index.js_)
    ```
        form.on('fileBegin', function (name, file) {
            // update name file
            file.path = uploadPath + file.name;
            res.redirect('/');
        });
    ```
    
    + New code
    ```
        form.on('fileBegin', function (name, file) {
            // update name file
            file.path = uploadPath + file.name;
        });
        form.on('end', function () {
            res.redirect('/');
        });
    ```