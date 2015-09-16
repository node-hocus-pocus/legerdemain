# Legerdemain
Run your Node.js Express app from Amazon's [AWS API Gateway](https://aws.amazon.com/api-gateway/).

## Status
Legerdemain is very much a work in progress. Don't use it for production. Please do report problems & use cases in the [Issues](https://github.com/johntitus/legerdemain/issues) tab on Github.

Legerdemain will become part of [Hocus Pocus](https://github.com/node-hocus-pocus) as soon as I get some time.

Hocus Pocus is going to handle the following -

`pocus` - a node module to handle the api gateway installation portion, so you don't have to click a million buttons in the gateway console.

`hocus` - A CLI runner for pocus.  So you can do `hocus deploy` and voila, everything gets setup in API Gateway.

## Installation
1) Install Legerdemain from NPM.
```
npm install legerdemain --save
```
2) Require ledgerdemain in your app definition file (usually app.js)
```js
var legerdemain = require('legerdemain');
```
3) In the same file, add an **exports.handler**. Make sure you **do not** have a module.exports of your app.
```js
//module.exports = app;
exports.handler = legerdemain.bind(app);
```
## Upload as an AWS Lambda
1) Zip up the contents of your app. **Do not** zip up the folder, just the contents.

2) Create a new Lambda function.

3) Set the handler to `app.handler`.


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