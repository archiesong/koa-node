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
const MenuModel = webDBUtil.import('../../models/Menu/MenuModel');
const RolesMenusModel = webDBUtil.import('../../models/RolesMenus/RolesMenusModel');

/**
 *  菜单
 */
module.exports = class MenuService {
  /**
   * 构建前端菜单路由
   * @param {*} ctx
   */
  async BuildMenus(jwt) {
    try {
      const { role_id } = Utils.getJwtData(jwt);
      RolesMenusModel.belongsTo(MenuModel, {
          foreignKey: 'menu_id'
        })
        const  menu = await RolesMenusModel.findAll({
          where: {
             role_id
          },
          include: [{
            model: MenuModel,
            attributes: []
          }],
          attributes:[
            Sequelize.col('menu.id'),
            Sequelize.col('menu.name'),
            Sequelize.col('menu.i_frame'),
            Sequelize.col('menu.component'),
            Sequelize.col('menu.pid'),
            Sequelize.col('menu.icon'),
            Sequelize.col('menu.path')
          ],
          order: [
            [Sequelize.col('menu.sort'), 'ASC']
          ],
          raw: true
        })
      return result.success(null,Utils.buildMenu(Utils.buildTree(menu)))
    } catch (error) {
      console.log(error)
      return result.failed();
    }
  }
}