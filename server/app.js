require('newrelic');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');

const apiProxy = httpProxy.createProxyServer();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

const room = 'http://54.191.38.196',
      booking = 'http://54.191.38.196',
      listings = 'http://35.162.174.32',
      photos = 'http://34.214.44.203';

      app.all('/room/*', (req, res) => {
        console.log('redirecting to booking service');
        apiProxy.web(req, res, {target: room});
      });
      
      app.all('/booking/*', (req, res) => {
        console.log('redirecting to booking service');
        apiProxy.web(req, res, {target: booking});
      });
      
      app.all('/listings/*', (req, res) => {
        console.log('redirecting to reservation service');
        apiProxy.web(req, res, {target: photos});
      });
      
      app.all('/photos/*', (req, res) => {
        console.log('redirecting to description service');
        apiProxy.web(req, res, {target: photos});
      });

      app.use('/:id', express.static('public'));

app.listen(PORT, () => {
  console.log('Proxy listening on port 8000');
});
