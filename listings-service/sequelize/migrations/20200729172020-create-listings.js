module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable("listings", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        user_id: {
            allowNull: false,
            type: DataTypes.UUID
        },
        _id: {
            allowNull: false,
            type: DataTypes.UUID
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        genre: {
            allowNull: true,
            type: DataTypes.STRING
        },
        year: {
            allowNull: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        createdAt: {
            allowNull: true,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE
        }
    }, {
        charset: "utf8"
    });
}