module.exports = {
    modules: {
        path: {
            folder: "/modules",
            file: "module.js"
        },
        controller: {
            path: {
                folder: "controller",
                file: "*.js"
            }
        },
        view : {
            path :{
                folder : "/public/themes/:theme/"
            }
        },
        route: {
            path: {
                file: "route.js"
            }
        }
    }
};