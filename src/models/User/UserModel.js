 import moment from "moment";
/**
 * 用户数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('user', {

        //ID
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        //用户名
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique:'username'
        },

        //密码
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

         //头像路径
         avatar: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        //是否启用 true启用 false禁用
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },

        //手机号
        phone:{
           type:DataTypes.STRING(255),
           allowNull:true
        },

        //邮箱
        email: {
            type:DataTypes.STRING(255),
            allowNull:true,
            unique:'UK_kpubos9gc2cvtkb0thktkbkes'
        },
        //最后修改密码的日期
        last_password_reset_time: {
            type: DataTypes.DATE,
            allowNull:false
        },

        //部门ID
        dept_id: {
            type: DataTypes.BIGINT(20),
            allowNull: true
        },

        //职业ID
        job_id:{
            type: DataTypes.BIGINT(20),
            allowNull: true
        },

        //创建时间
        create_time: {
            type: DataTypes.DATE,
            allowNull:false
        }

    }, {
        tableName: 'user',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};

