import {
    request,
    tags,
    summary,
    responses
  } from 'koa-swagger-decorator'
  import services from '../../services';
  const RoleService = new services.Role.RoleService();
  const RoleTag = tags(['role-controller'])
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

export default class RoleController {
    @request('GET', '/api/roles')
    @summary('获取角色')
    @response
    @RoleTag
    static async FetchRoles(ctx) {
        ctx.body = await RoleService.FetchRoles(ctx.request.query);
    }
}