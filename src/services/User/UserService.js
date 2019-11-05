import result from '../../tools/Result';
import Utils from '../../tools/Utils';
import sequelize from '../../lib/sequelize';
import RedisService from '../../lib/redis-db';
import moment from "moment";
/* eslint-disable */
const {
  webDBUtil,
  Sequelize
} = sequelize;
const Op = Sequelize.Op;
const UserModel = webDBUtil.import('../../models/User/UserModel');
const JobModel = webDBUtil.import('../../models/Job/JobModel');
const DeptModel = webDBUtil.import('../../models/Dept/DeptModel');
const RoleModel = webDBUtil.import('../../models/Role/RoleModel');
const UsersRolesModel = webDBUtil.import('../../models/UsersRoles/UsersRolesModel')

/**
 *  用户
 */
module.exports = class UserService {
  /**
   * 获取所有用户
   *
   */
  async getUser({
    page,
    limit,
    enabled,
    keywords,
    deptId
  }) {
    try {
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
      var queryParams = {};
      var deptParams = {};
      if (keywords) {
        queryParams.username = {
          [Op.like]: `%${keywords.replace(/\s+/g,'')}%`
        }
        queryParams.email = {
          [Op.like]: `%${keywords.replace(/\s+/g,'')}%`
        }
      }
      if (deptId) {
        deptParams[Op.or] = [{
            id: deptId
          },
          {
            pid: deptId
          }
        ]
      }
      if (enabled !== undefined) {
        queryParams.enabled = Number(enabled)
      }

      const {
        rows,
        count
      } = await UserModel.findAndCountAll({
        where: queryParams,
        include: [{
          model: JobModel
        }, {
          where: deptParams,
          model: DeptModel
        }, {
          model: RoleModel
        }],
        offset: Number((page - 1) * limit),
        limit: Number(limit),
        order: [
          ['id', 'ASC']
        ],
        raw: true
      });
      var userList = [];
      rows.forEach(item => {
        userList.push({
          id: item.id,
          username: item.username,
          avatar: item.avatar,
          enabled: Boolean(item.enabled),
          phone: item.phone,
          email: item.email,
          create_time: moment(item['create_time']).format('YYYY-MM-DD HH:mm:ss'),
          last_password_reset_time: moment(item['last_password_reset_time']).format('YYYY-MM-DD HH:mm:ss'),
          dept: {
            id: item['dept.id'],
            name: item['dept.name']
          },
          job: {
            id: item['job.id'],
            name: item['job.name']
          },
          roles: {
            id: item['roles.id'],
            name: item['roles.name'],
            dataScope: item['roles.data_scope'],
            level: item['roles.level']
          }
        })
      });
      return result.pageData(null, null, userList, count, page, limit)
    } catch (error) {
      console.log(error)
      return result.failed();
    }
  }
  async createUser({username,phone,email,dept,job,enabled, roleId }){
    try {
      const hasUser = await UserModel.findOne({
        where: { username },
        raw: true
      })
      if (hasUser) return result.failed(`此用户已存在!`);
    console.log({
      username,
      password: Utils.getMd5('123456'),
      phone,
      email,
      enabled: (enabled == 'true'? 1: 0),
      dept_id: dept,
      job_id: job,
      avatar:'',
      create_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      last_password_reset_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    });
    console.log(email);
     var res = UserModel.create({
        username:username,
        password: Utils.getMd5('123456'),
        phone:phone,
        email,
        enabled: (enabled == 'true'? 1: 0),
        dept_id: dept,
        job_id: job,
        avatar:'',
        create_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        last_password_reset_time:moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      })
      console.log(res);
      return result.success()
    } catch (error) {
      console.log(error)
      return result.failed();
    }

  }
}