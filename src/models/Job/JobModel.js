import moment from "moment";
/**
 * 用户所属职业数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
  return sequelize.define('job', {

    //ID
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

    //是否启用 true启用 false禁用
    enabled: {
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

    //排序
    sort: {
      type: DataTypes.BIGINT(20),
      allowNull: false
    },

    //部门ID
    dept_id: {
      type: DataTypes.BIGINT(20),
      allowNull: true
    }

  }, {
    tableName: 'job',
    timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
  });
};