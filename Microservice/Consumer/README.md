# Consumer

## Rerun example and check errors
* I installed and used npm-check-updates module to automatically check all dependencies in package.json and update to their latest versions
```bash
  npm i -g npm-check-updates
  npm-check-updates -u
  npm install
```
* Updates modules
```bash
    actionhero-client   ^4.0.0  →  ^5.0.0
    feedparser          ^1.1.4  →  ^2.2.0
    request             ^2.67.0 →  ^2.81.0
```
## Workflow
* Example Consumer folder structure 
```bash
.
├── config
├── features
├── public
├── package.json
├── README.md
└── server.js
```
