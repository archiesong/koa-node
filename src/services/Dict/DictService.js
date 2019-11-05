import result from '../../tools/Result';
import Utils from '../../tools/Utils';
import sequelize from '../../lib/sequelize';
import RedisService from '../../lib/redis-db';
import middleware from '../../middleware';
import moment from "moment";
/* eslint-disable */
const {
  webDBUtil,
  Sequelize
} = sequelize;
const Op = Sequelize.Op;
const DictModel = webDBUtil.import('../../models/Dict/DictModel');
const DictDetailModel = webDBUtil.import('../../models/DictDetail/DictDetailModel');
/**
 *  菜单
 */
module.exports = class DictService {
  /**
   * 获取系统字典
   * @param {*} name
   */
  async FetchDictByName({
    dictName,
    page,
    limit
  }) {
    try {
      DictDetailModel.belongsTo(DictModel, {
        foreignKey: 'dict_id'
      })

      const {
        rows,
        count
      } = await DictDetailModel.findAndCountAll({
        include: [{
          where: {
            name: dictName
          },
          model: DictModel
        }],
        offset: Number((page - 1) * limit),
        limit: Number(limit),
        raw: true
      })
      var dictList = [];
      rows.forEach(item => {
        dictList.push({
          id: item.id,
          label: item.label,
          sort: item.sort,
          value: item.value
        })
      });
      return result.pageData(null, null, dictList, count, page, limit)
    } catch (error) {
      console.log(error)
      return result.failed();
    }
  }
}