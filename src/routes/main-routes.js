//主路由文件
import KoaRouter from 'koa-router';
import { SwaggerRouter } from 'koa-swagger-decorator'
import path from 'path';
// import controllers from '../controllers/index.js';

const router = new SwaggerRouter() // extends from koa-router
router.swagger({
  title: 'API V2 Server',
  description: 'API DOC',
  version: '1.0.0',
  // [optional] default is root path.
  // if you are using koa-swagger-decorator within nested router, using this param to let swagger know your current router point
  // prefix: '/api',
  // [optional] default is /swagger-html
  swaggerHtmlEndpoint: '/swagger-html',

  // [optional] default is /swagger-json
  swaggerJsonEndpoint: '/swagger-json',

  // [optional] additional options for building swagger doc
  // eg. add api_key as shown below
  swaggerOptions: {
    // securityDefinitions: {
    //   Bearer: {
    //     type: 'apiKey',
    //     in: 'header',
    //     name: 'Authorization',
    //   },

    // },
    basePath: "/",
    tags:[
      {
        "name": "authentication-controller",
        "description": "Authentication Controller"
      }
    ]
  },
  // [optional] additional configuration for config how to show swagger view
  swaggerConfiguration: {
    display: {
      defaultModelsExpandDepth: 4, // The default expansion depth for models (set to -1 completely hide the models).
      defaultModelExpandDepth: 3, // The default expansion depth for the model on the model-example section.
      docExpansion: 'list', // Controls the default expansion setting for the operations and tags.
      defaultModelRendering: 'model' // Controls how the model is shown when the API is first rendered.
    }
  }
})
// map all static methods at Test class for router
// router.map(controllers);
// console.log(path.resolve(__dirname,'../controllers/index.js'))
// mapDir will scan the input dir, and automatically call router.map to all Router Class
router.mapDir(path.resolve(__dirname,'../controllers'), {
  // default: true. To recursively scan the dir to make router. If false, will not scan subroutes dir
  // recursive: true,
  // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
  // doValidation: true,
})



export default router;