import moment from "moment";
/**
 * 系统字典数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('dict', {
        //ID
        id: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //字典名称
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        //描述
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'dict',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};