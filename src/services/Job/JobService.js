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
// const Op = Sequelize.Op;
const DeptModel = webDBUtil.import('../../models/Dept/DeptModel');
const JobModel = webDBUtil.import('../../models/Job/JobModel');
/**
 *  岗位
 */
module.exports = class JobService {
  /**
   * 获取所有岗位
   * @param {*} ctx
   */
  async FetchJobs({deptId, page, limit}) {
    try {
      JobModel.belongsTo(DeptModel, {
        foreignKey: 'dept_id'
      })
      var jobParams = {};
      if (deptId) jobParams.dept_id =  deptId
      const {rows, count} = await JobModel.findAndCountAll({
        where: jobParams,
        include: [{
            model: DeptModel
        }],
        offset: Number((page - 1) * limit),
        limit: Number(limit),
        raw: true
      })
      return  result.pageData(null, null, rows, count, page, limit)
    } catch (error) {
      console.log(error)
      return result.failed();
    }
  }
}