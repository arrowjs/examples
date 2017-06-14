Demo Arrowjs runs long run tasks in other service using ZeroMQ to communicate
==============================

## Cài phần mềm

GraphicsMagick và ImageMagick
- Trên Mac OSX
```
brew install imagemagick
brew install graphicsmagick
```

- Trên ubutu
```
sudo apt-get update
sudo apt-get install imagemagick
sudo apt-get install graphicsmagick
```


## Chạy ví dụ
1) Cài đặt node_modules
```
cd ZeromqSocketio
npm i
```

2) Cấu hình CSDL 
- ConvertService/config/env/development.js
- FrontendServer/config/env/development.js

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

ConvertService
```
cd ConvertService
npm start
```

FrontendServer
```
cd FrontendServer
npm start
```


[http://localhost:3333](http://localhost:3333)

## Cấu hình app FrontendServer sử dụng action từ app ConvertService

1) Tạo file services.js trong FrontendServer/config/ 

    Code
    ```
    module.exports = {
        services: {
            convertImage: {
                logging: true,
                protocol: "tcp",
                host: "127.0.0.1",  
                port: "5555"        //port của ConvertService
                //monitor: {
                //    interval: 100,
                //    numOfEvents: 0
                //}
            }
        }
    };
    ```
    
2) Tạo file services.js trong ConvertServices/config/
    
    Code 
    ```
    module.exports = {
        service_setting: {
            enable : true,
            logging : true
        }
    };
    ```

3) sử dụng: 
```
application.services.convertImage.send({
    action: "image.convert",
    data: {
        link: fileName
    }
}, function (err, data) {
    if (err) {
        application.io.to(socketId).emit("convertError", err)
    } else {
        application.io.to(socketId).emit("converted", data)
    }
})
```
- services và convertImage ta cần điền đúng như trong config
- image và convert: Được khai báo trong ConvertService/config/structure.js
    ```
    module.exports = {
        image: {
            "action": {
                "path": {
                    "folder": "actions",
                    "file": "*.js"
                }
            }
        }
    };
    ```
- Khi đó trong ConvertService/convertImage/actions/index.js ta phải tạo 1 actions.convert thì mới có thể gọi hàm image.convert được.
    ```
    action.convert = function (data,cb) {...}
    ```
==============================================

- User uploads image to FrontendServer using AJAX call. SocketID is stored when FrontendServer parse submit form. See `FrontendServer/features/upload-file/view/index.twig`
- FrontendServer sends message with image URL to ConvertService using ZeroMQ. FrontendServer uses module [arrow-zeromq](https://www.npmjs.com/package/arrow-zeromq). See `FrontendServer/features/upload-file/controller/index.js`

```
application.services.convertImage.send({
    action: "image.convert",
    data: {
        link: fileName //Send URL of photo in message payload
    }
}, function (err, data) {  //Convert photo service call back
    if (err) {
        application.io.to(socketId).emit("convertError", err)
    } else {
        application.io.to(socketId).emit("converted", data)
    }
})
```

- ConvertService receives message, converts then sends back new image link through ZeroMQ. See `ConvertService/imageConvert/actions/index.js`
- Frontendserver receives message and notifies to user through socket.io. Stored SocketID stored in previous step is used to send to correct user.
![image](diagram.jpg)
