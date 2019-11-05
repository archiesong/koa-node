/**
 * 用户角色模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('role', {
        //ID
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
          //创建时间
        create_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        //名称
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        //标题
        label: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        //备注
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
         //数据权限范围
         data_scope: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        //角色等级
        level:{
           type:DataTypes.INTEGER(255),
           allowNull:true
        }

    }, {
        tableName: 'role',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};