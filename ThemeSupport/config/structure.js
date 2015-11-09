module.exports = {
    modules: {
        "path": {
            "folder": "/modules",
            "file": "module.js"
        },
        "extends": {
            system: true,
            active: true
        },
        //"model": {
        //    "path": {
        //        "folder": "models",
        //        "file": "*.js"
        //    }
        //},
        "view": {
            "path": {
                "folder": ["/public/themes/*","view"],
                depend : "theme"
            }
        },
        "controller": {
            "path": {
                "folder": "controller",
                "file": "*.js"
            }
        },
        "helper": {
            "path": {
                "folder": "helper",
                "file": "*.js"
            }
        },
        "route": {
            "path": {
                "file": "route.js"
            }
        }
    }
};