module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        uid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        pids: DataTypes.JSON,
    });

    User.associate = function(models) {
        User.hasMany(models.Project, {
            onDelete: "cascade"
        });
    }

    return User;
}