module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        timestamps: true
    })
);
