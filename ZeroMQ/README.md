ZeroMQ example
==================

## Tải demo
Chỉ làm 1 lần vì tải về đã tải tất cả các ví dụ rồi.
```
git clone https://github.com/arrowjs/examples.git
cd examples/
```

## Chạy ví dụ
1) Cài đặt node_modules
```
cd ZeroMQ
npm i
```

2) Chạy app
- Chạy A
```
cd A
npm start
```

- Chạy B
```
cd B
npm start
```

[http://localhost:3333](http://localhost:3333)

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
 arrowjs        ^0.3.16  →  ^0.5.0
 arrow-zeromq   ^0.0.3  →  ^0.0.4
```
## Workflow
* Example ZeroMQ folder structure 
```bash
A
├── config
├── features
└── server.js

B
├── config
├── features
└── server.js
```