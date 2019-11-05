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
const Op = Sequelize.Op;
const DeptModel = webDBUtil.import('../../models/Dept/DeptModel');
/**
 *  菜单
 */
module.exports = class DeptService {
  /**
   * 获取所有部门
   * @param {*} ctx
   */
  async FetchDept({deptName}) {
    try {
      var deptParmas = {}
      console.log(deptName);
      if (deptName) {
        deptParmas.name  = {
            [Op.like]: `%${deptName.replace(/\s+/g,'')}%`
        }
      }

      const dept = await DeptModel.findAll({
        where: deptParmas,
        raw: true
      })
      return result.success(null, Utils.transData(dept, 'id', 'pid', 'children'))
    } catch (error) {
      console.log(error)
      return result.failed();
    }
  }
}