import {
    request,
    tags,
    query,
    summary,
    responses,
  } from 'koa-swagger-decorator'
  import services from '../../services';
  const JobService = new services.Job.JobService();
  import Utils from '../../tools/Utils';
  const JobTag = tags(['Job-controller'])
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
 * JobsController
 * 用户岗位类
 */
export default class JobsController {
    /**
     * 获取所有岗位
     * @param {*} ctx 请求体
     * @return
     */
    @request('GET', '/api/job')
    @summary('获取所有岗位')
    @query({
        deptId:{
            type:'string'
        },
        page: {
            type: 'number'
        },
        limit: {
            type: 'number'
        }
    })
    @response
    @JobTag
    static async FetchJobs(ctx) {
        ctx.body = await JobService.FetchJobs(ctx.request.query);
    }
}
