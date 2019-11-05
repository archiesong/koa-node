/*
 * @Author: archesong
 * @Date: 2019-09-20 14:29:21
 * @Last Modified by: archesong
 * @Last Modified time: 2019-10-17 13:25:18
 */

import {
  request,
  body,
  tags,
  summary,
  responses,
  query
} from 'koa-swagger-decorator'
import services from '../../services';
import Utils from '../../tools/Utils';
const AuthenticationService = new services.Authentication.AuthenticationService();
const AuthTag = tags(['Authentication-controller'])
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
 * AuthenticationController
 * 用户登录授权类
 */

export default class AuthenticationController {
  /**
   * 登录授权
   * @param {*} ctx 请求体
   * @return
   */
  @request('POST', '/auth/login')
  @summary('用户登录')
  @response
  @AuthTag
  @body({
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    uuid:{
      type: 'string',
      required: true
    },
    captcha: {
      type: 'string',
      required: true
    }
  })
  static async adminLogin(ctx) {
    ctx.body = await AuthenticationService.Login(ctx.request.body);
  }
  @request('GET','/auth/info')
  @summary('获取用户信息')
  @query({
    token:{
      type:'string'
    }
  })
  @response
  @AuthTag
  static async getUserInfo(ctx) {
    ctx.body = await AuthenticationService.getUserInfo(Utils.getCtxJwt(ctx))
  }
  /**
   *获取验证码
   */
  @request('GET', '/auth/validateCode')
  @summary('获取验证码')
  @AuthTag
  @response
  static async getValidateCode(ctx) {
    ctx.body = await AuthenticationService.getValidateCode(ctx);
  }
}