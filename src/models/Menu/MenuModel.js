import moment from "moment";
/**
 *菜单数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
  return sequelize.define('menu', {

    //ID主键
    id: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    //名称
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    //是否外链 true 是  false不是
    i_frame: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },

    //创建时间
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue('create_time')).format('YYYY-MM-DD hh:mm:ss');
      }
    },
    //组件
    component:{
      type: DataTypes.STRING(255),
      allowNull:true
    },
    //排序
    sort: {
      type: DataTypes.BIGINT(20),
      allowNull: false
    },

    //父级ID
    pid: {
      type: DataTypes.BIGINT(20),
      allowNull: false
    },
    //图标
    icon:{
        type: DataTypes.STRING(255),
        allowNull:true
    },
    //路径
    path:{
        type:DataTypes.STRING(255),
        allowNull:true
   }

  }, {
    tableName: 'menu',
    timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
  });
};