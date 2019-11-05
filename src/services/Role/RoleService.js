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
const RoleModel = webDBUtil.import('../../models/Role/RoleModel');
module.exports = class RoleService {
  async FetchRoles() {
    try {
      const role = await RoleModel.findAll({
        raw: true
      })
      console.log(role);
      return result.success(null, role)
    } catch (error) {
      console.log(error)
      return result.failed();
    }
  }
}