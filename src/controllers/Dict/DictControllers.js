import {
  request,
  tags,
  query,
  summary,
  responses,
} from 'koa-swagger-decorator'
import services from '../../services';
const DictService = new services.Dict.DictService();
import Utils from '../../tools/Utils';
const DictTag = tags(['Dict-controller'])
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
 * DictsController
 * 系统字典类
 */
export default class DictController {
  /**
   * 获取系统字典
   * @param {*} ctx 请求体
   * @return
   */
  @request('GET', '/api/dictDetail')
  @summary('获取系统字典')
  @query({
    dictName: {
      type: 'string',
      required: true
    },
    page: {
      type: 'number',
      required: true
    },
    limit: {
      type: 'number',
      required: true
    }
  })
  @response
  @DictTag
  static async FetchDictByName(ctx) {
    ctx.body = await DictService.FetchDictByName(ctx.request.query);
  }
}