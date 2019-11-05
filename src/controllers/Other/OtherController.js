import {
    request,
    body,
    tags,
    summary,
    responses,
    query
  } from 'koa-swagger-decorator'

const response = responses({
  200: {
    description: "OK"
  },
  201: {
    description: "Created"
  },
  401: {
    description: "Unauthorized"
  },
  403: {
    description: "Forbidden"
  },
  404: {
    description: "Not Found"
  }
})
  export default class OtherController{
    @request('POST', '/pc_session')
    @summary('获取session')
    @tags(['Other-controller'])
    @response
    @body({
        token:{
          type:'string'
        },
        device_name:{
            type:'string'
        },
        clientId:{
            type:'string'
        }
    })
    static async PcSession(ctx){
       console.log(ctx.request.body);
    //    ctx.body = await AuthenticationService.Login(ctx.request.body);
    }
  }