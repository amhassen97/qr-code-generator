var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');



//Check for dev or prod environment
const dev = process.env.NODE_ENV !== "production";

var app = express();



  //livereload
  if(dev){
    const livereload = require("livereload"); 
    const connectLiveReload = require("connect-livereload");
    const liveReloadPort =  35729 ;

    const exts = ['html', 'ejs', 'css', 'js', 'png', 'gif', 'jpg', 'php', 'php5', 'py', 'rb', 'erb', 'coffee'];
    const liveReloadServer = livereload.createServer({exts: exts, port : liveReloadPort });
    liveReloadServer.watch(path.join(__dirname, 'views'));
    
    //client refresh delay on server restart
    liveReloadServer.server.once("connection", () => {
      setTimeout(() => {
        liveReloadServer.refresh("/");
      }, 30);
      
    })

    app.use(connectLiveReload({
      port : liveReloadPort
    }));

    };


    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'views')));
    app.set('view engine', 'ejs')
    
    // Routes
    var indexRouter = require('./routes/index');
    
    app.use('/', indexRouter);


 


const port = 3000;

app.listen(port, function() {
    console.log(`Express server listening on http://localhost:${port} `);
})

// module.exports = app;
