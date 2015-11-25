#### Description
- User upload image to frontendServer.(AJAX)
- FrontendServer sends message (image link) to convertService. (Zeromq)
- ConvertService receives message, convert then send back new image link. (Zeromq)
- Frontendserver receives message and notify to user by websockets. (Socket.io)

#### Requirement
- imagemagick

```
	brew install imagemagick
```
- Zeromq

```
	brew install zmq
```
#### Install
install node_modules

```
	npm install

```

Start image converter services

```
	cd ConvertService
	node server.js
```

Start frontend server

```
	cd FrontendServer
	node server.js
```

open browser with link **http://localhost:3333/**