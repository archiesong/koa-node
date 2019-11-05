import result from '../../tools/Result';
import Utils from '../../tools/Utils';
import sequelize from '../../lib/sequelize';
import RedisService from '../../lib/redis-db';
import middleware from '../../middleware';
/* eslint-disable */
const {
  webDBUtil,
  Sequelize
} = sequelize;
const UserModel = webDBUtil.import('../../models/User/UserModel');
const JobModel = webDBUtil.import('../../models/Job/JobModel');
const DeptModel = webDBUtil.import('../../models/Dept/DeptModel');
const RoleModel = webDBUtil.import('../../models/Role/RoleModel');
const UsersRolesModel = webDBUtil.import('../../models/UsersRoles/UsersRolesModel')
/* eslint-endble */
const {
  ValidateTools
} = middleware.ValidateTools;
const validateTools = new ValidateTools();

/**
 * 登陆系统
 */
module.exports = class LoginService {
  /**
   * 用户登录
   * @param {*} user
   */
  async Login({
    username,
    password,
    uuid,
    captcha
  }) {
    try {
      //判断请求传递过来的参数是否缺失
      if (!username || !password || !captcha || !uuid) {
        return result.paramsLack();
      }
      // 查询验证码
      const captchaText = await RedisService.findByKey(uuid);

      // 清除缓存中的验证码
      RedisService.delete(uuid);
      if (!captchaText) return result.failed(`验证码已过期`)
      //校验验证码
      if (String(captcha).toLowerCase() !== String(captchaText).toLowerCase()) return result.failed(`验证码错误!`);
      UserModel.belongsTo(JobModel, {
        foreignKey: 'job_id'
      })
      UserModel.belongsTo(DeptModel, {
        foreignKey: 'dept_id'
      })
      UserModel.belongsToMany(RoleModel, {
        through: UsersRolesModel,
        foreignKey: 'user_id'
      })
      RoleModel.belongsToMany(UserModel, {
        through: UsersRolesModel,
        foreignKey: 'role_id'
      })
      //查询用户信息
      const jwtUser = await UserModel.findOne({
        where: {
          username
        },
        include: [{
          where:{
            enabled: 1
          },
          model: JobModel,
          attributes:[]
        }, {
          where:{
            enabled: 1
          },
          model: DeptModel,
          attributes:[]
        }, {
          model: RoleModel,
          attributes:[['name','role_name'],['id', 'role_id']]
        }],
        attributes:[
          Sequelize.col('user.username'),
          Sequelize.col('user.password'),
          Sequelize.col('user.avatar'),
          Sequelize.col('user.phone'),
          Sequelize.col('user.email'),
          Sequelize.col('user.enabled'),
          Sequelize.col('user.create_time'),
          [Sequelize.col('job.name'),'job'],
          [Sequelize.col('dept.name'),'dept']
        ],
        raw: true
      });
      try {
        const {
          username,
          enabled,
          avatar,
          email,
          create_time,
          phone,
          job,
          dept,
          role_id = jwtUser['roles.role_id'],
          roles = [jwtUser['roles.role_name']]
        } = jwtUser;
        console.log(Utils.getMd5(password));
        if (Utils.getMd5(password) !== jwtUser.password) return result.failed(`密码错误!`);
        if (!enabled) return result.failed(`账号已停用，请联系管理员!`);
        const token = validateTools.getJWT({
          name: username,
          enabled: Boolean(enabled),
          avatar,
          email,
          create_time,
          phone,
          job,
          dept,
          role_id,
          roles
        }, 3600 * 24);
        return result.success(null, {
          token
        });
      } catch (error) {
        return result.failed(`用户名不存在!`);
      }
    } catch (error) {
      console.log(error);
      return result.failed();
    }
  }
  /**
   *获取用户信息
   */
  async getUserInfo(jwt) {
    try {
      const {
        avatar,
        create_time,
        dept,
        email,
        enabled,
        job,
        phone,
        roles,
        username
      } = Utils.getJwtData(jwt);

      // const {
      //   data,
      //   exp
      // } = validate;
      // const nowTimestamp = Date.now() / 1000;
      // if (!validate || nowTimestamp > exp) return result.authorities();
      return result.success(null, {
        avatar,
        create_time,
        dept,
        email,
        enabled,
        job,
        phone,
        roles,
        username
      })
    } catch (error) {
      console.log(error)
      return result.failed();
    }
  }
  /**
   * 获取验证码
   */
  async getValidateCode(ctx) {
    try {
      //生成验证码
      const {
        text,
        data
      } = Utils.getValidateCode();
      console.log(text)
      //生产uuid
      const uuid = Utils.getTimeStampUUID();
      RedisService.save(uuid, text, 9000)
      return result.success(null, {
        uuid,
        data
      });
    } catch (error) {
      console.log(error);
      return result.failed();
    }

  }
};