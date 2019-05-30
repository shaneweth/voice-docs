module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: DataTypes.STRING,
        pNames: DataTypes.TEXT,
    });

    User.associate = function(models) {
        User.hasMany(models.Project, {
            onDelete: "cascade"
        });
    }

    return User;
}