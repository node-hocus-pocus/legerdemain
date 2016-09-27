# Legerdemain
Lets your Node.js Express app understand Amazon's [API Gateway](https://aws.amazon.com/api-gateway/)/[Lambda](https://aws.amazon.com/lambda/) requests.

## Status
Legerdemain is very much a work in progress. Don't use it for production. Please do report problems & use cases in the [Issues](https://github.com/johntitus/legerdemain/issues) tab on Github.

Legerdemain is part of [Hocus Pocus](https://github.com/node-hocus-pocus), and works well with [Hocus](https://github.com/node-hocus-pocus/Hocus) and [Pocus](https://github.com/node-hocus-pocus/pocus). You can use Legerdemain without Hocus and Pocus, but you'll have to do a lot more things manually.

## Installation
1) Install Legerdemain from NPM.
```
npm install legerdemain --save
```
2) Make sure your main application file (something like app.js) has module.exports line.  This is created by default by Express:
```js
module.exports = app;
```
3) Create a file to expose a Lambda handler, with this as it's contents. We'll refer to this file as `translator.js` in the next step.
```js
var legerdemain = require('legerdemain');
var app = require('./app.js');
exports.handlers = legerdemain.bind(app)
```

## Upload as an AWS Lambda
1) Zip up the contents of your app. **Do not** zip up the folder, just the contents.

2) Create a new Lambda function.

3) Set the handler to `translator.handler`.


## Setup your API Gateway
1) Create a new API.

2) Define your resources and methods to match your app's routes. Map each method to your Lambda.

3) For each Method in the Gateway:

For the **Integration Request**, create a **Mapping Template** with *Content-type* of *application/json*. The actual template should look like this:
```json
{
    "stage": "$context.stage",
    "request-id": "$context.requestId",
    "api-id": "$context.apiId",
    "resource-path": "$context.resourcePath",
    "resource-id": "$context.resourceId",
    "http-method": "$context.httpMethod",
    "source-ip": "$context.identity.sourceIp",
    "user-agent": "$context.identity.userAgent",
    "account-id": "$context.identity.accountId",
    "api-key": "$context.identity.apiKey",
    "caller": "$context.identity.caller",
    "user": "$context.identity.user",
    "user-arn": "$context.identity.userArn",
    "queryString": "$input.params().querystring",
    "headers": "$input.params().header",
    "pathParams": "$input.params().path",
    "allParams": "$input.params()"
}
```
If the method is meant to return HTML,

3a) Create a **Method Response** with *Content-type* of *text/html* and use the **Empty Model**.

3b) Create an **Integration Response** with a **Mapping Template**, *Content-type* of *text/html*, with the following actual template:
```
#set($inputRoot = $input.path('$'))
$inputRoot.data
```

4) Deploy your API.

AWS API Gateway will give you the base URL to your app. Open that base url, plus your route, in your browser. For instance, if you have a "/" route, you can just open the base URL that AWS API Gatway provided.

## License
MIT