import {
    request,
    tags,
    query,
    summary,
    responses,
  } from 'koa-swagger-decorator'
  import services from '../../services';
  const DeptService = new services.Dept.DeptService();
  import Utils from '../../tools/Utils';
  const DeptTag = tags(['Dept-controller'])
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
 * DetpsController
 * 用户部门类
 */
export default class DetpController {
    /**
     * 获取所有部门
     * @param {*} ctx 请求体
     * @return
     */
    @request('GET', '/api/dept')
    @summary('获取所有部门')
    @query({
        deptName:{
            type:'string'
        }
    })
    @response
    @DeptTag
    static async FetchDept(ctx) {
        ctx.body = await DeptService.FetchDept(ctx.request.query);
    }
}
