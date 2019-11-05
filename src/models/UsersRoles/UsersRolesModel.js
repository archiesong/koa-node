/**
 * 用户角色过渡中间表数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('users_roles', {
        //用户ID
        user_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true
        },

        //角色ID
        role_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true
        }

    }, {
        tableName: 'users_roles',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};