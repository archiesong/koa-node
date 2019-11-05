import {
    request,
    tags,
    summary,
    responses
  } from 'koa-swagger-decorator'
  import services from '../../services';
  const MenuService = new services.Menu.MenuService();
  import Utils from '../../tools/Utils';
  const menuTag = tags(['menu-controller'])
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
 * MenuController
 * 用户菜单类
 */
export default class MenuController {
    /**
     * 构建前端菜单路由
     * @param {*} ctx 请求体
     * @return
     */
    @request('GET', '/api/menus/build')
    @summary('获取生成侧边栏菜单路由')
    @response
    @menuTag
    static async BuildMenus(ctx) {
        ctx.body = await MenuService.BuildMenus(Utils.getCtxJwt(ctx));
    }
}
