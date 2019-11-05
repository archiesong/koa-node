/**
 * 角色菜单过渡中间表数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('roles_menus', {
        //菜单ID
        menu_id: {
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
        tableName: 'roles_menus',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};