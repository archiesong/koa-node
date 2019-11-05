import moment from "moment";
/**
 * 用户所属部门数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('dept', {

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

        //上次部门ID
        pid: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },

        //是否启用 true启用 false禁用
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        //创建时间
        create_time: {
            type: DataTypes.DATE,
            allowNull: true,
            get() {
                return moment(this.getDataValue('create_time')).format('YYYY-MM-DD hh:mm:ss');
            }
        }

    }, {
        tableName: 'dept',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};