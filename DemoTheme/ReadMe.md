Demo Theme
==================

ArrowJS uses [Nunjuck template](https://mozilla.github.io/nunjucks/) to render HTML page.

## Configure theme folder
In the folder config/structure, you can define folder location for theme (Nunjuck view + CSS + JavaScript).
Option A: views + theme are inside module folder

```javascript
view : {
  path :{
    folder : "view"
  }
}
```
Option B: views + theme are inside ```/public/themes/:theme``` 
```javascript
view : {
  path :{
    folder : "/public/themes/:theme/"
  }
}
```
```:theme``` is theme name parameter. In the /public/themes folder, there may be several theme folders. We need to specify correct theme folder name.

In config/	view.js file:

 - ```resource.path = 'public'``` specifies location of static resources including themes. In fact theme folder contains many CSS, JavaScript, images files.
 - ```theme = 'clean'```; specifies which theme folder will be selected to used

```javascript
module.exports = {
    resource : {
        path : 'public',
        option : {
            maxAge: 3600
        }
    },
    viewExtension : "twig",
    pagination: {
        number_item: 20
    },
    theme: "clean"
};
```