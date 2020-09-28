import {
    DataTypes,
    Model
} from "sequelize";

import sequelize from "./connection";

export class Listing extends Model { }

Listing.init({
    user_id: {
        allowNull: false,
        type: DataTypes.UUID
    },
    _id: {
        allowNull: false,
        type: DataTypes.UUID,
        unique: false
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
    }
}, {
    sequelize,
    modelName: "listings"
});