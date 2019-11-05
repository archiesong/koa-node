import moment from "moment";
/**
 * 系统字典详情数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('dict_detail', {
        //ID
        id: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //字典标签
        label: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
           //字典值
        value: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        //排序
        sort:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        //字典id
        dict_id: {
            type: DataTypes.BIGINT(11),
            allowNull: true
        }
    }, {
        tableName: 'dict_detail',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};