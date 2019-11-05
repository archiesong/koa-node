
import {
    request,
    body,
    tags,
    summary,
    responses,
  } from 'koa-swagger-decorator'
  import services from '../../services';
  import Utils from '../../tools/Utils';
  const UserService = new services.User.UserService();
  const userTag = tags(['user-controller'])
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

 /**
 * UsersController
 * 用户信息类
 */
  export default class UsersController {
    @request('POST', '/api/users')
    @summary('获取所有用户')
    @response
    @userTag
    @body({
      page: {
        type: 'number',
        required: true
      },
      limit: {
        type: 'number',
        required: true
      },
      keywords: {
        type: 'string'
      },
      deptId:{
         type: 'string'
      },
      enabled:{
        type: 'boolean'
      }
    })
    static async getUser(ctx) {
      ctx.body = await UserService.getUser(ctx.request.body);
    }
    @request('POST', '/api/create')
    @summary('创新新用户')
    @response
    @userTag
    @body({
      username: {
        type: 'string'
      },
      phone: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      dept:{
        type: 'string'
      },
      job:{
        type: 'string'
      },
      enabled:{
        type: 'string'
      },
      roleId:{
        type: 'string'
      }
    })
    static async createUser(ctx) {
      ctx.body = await UserService.createUser(ctx.request.body)
    }
  }