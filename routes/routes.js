const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

/* get routes */
app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.get(`/form`, controller.getForm);

/* post routes */
app.post(`/postform`, controller.postForm);

module.exports = app;
