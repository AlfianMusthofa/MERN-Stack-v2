import { Sequelize } from "sequelize";
import db from '../config/db.js'

const { DataTypes } = Sequelize

const product = db.define('imagedb', {
   name: DataTypes.STRING,
   image: DataTypes.STRING,
   url: DataTypes.STRING
}, {
   freezeTableName: true
})

export default product;

(async () => {
   await db.sync()
})()