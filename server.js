import express from 'express';
import { createApp } from './app.js'
import { renderToString } from 'vue/server-renderer';
import bodyParser from "body-parser";

const server = express();
server.use(express.static('.'));
server.use(bodyParser());

server.get("/", (req,res)=>{
    const app = createApp();

    renderToString(app).then((html) => {
        res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
      <script type="module" src="/client.js"></script>
    </html>
    `)

    app.mount("#app");
    })

})




server.use( (err, req, res, next) => {
    res.status(500);
    res.render('error', { error: err });
})



server.listen("8080", () => {
    console.log("listen on: http://localhost:8080")
})
