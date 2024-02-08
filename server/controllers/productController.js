import product from "../models/image_models.js";
import path from 'path'
import fs from 'fs'

export const getData = async (req, res) => {
   try {
      const response = await product.findAll()
      res.status(200).json(response);
   } catch (error) {
      console.log(error)
   }
}

export const getDataById = async (req, res) => {
   try {
      const response = await product.findOne({
         where: {
            id: req.params.id
         }
      })
      res.json(response)
   } catch (error) {
      console.log(error)
   }
}

export const saveData = (req, res) => {
   if (req.files === null) return res.status(400).json({ msg: 'No file uploaded' })
   const name = req.body.title;
   const file = req.files.file;
   const fileSize = file.data.length;
   const ext = path.extname(file.name);
   const fileName = file.md5 + ext;
   const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
   const allowedType = ['.png', '.jpg', '.jpeg'];

   if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid image' })
   if (fileSize > 5000000) return res.status(422).json({ mgs: 'Gambar terlalu besar!' })

   file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message })
      try {
         await product.create({ name: name, image: fileName, url: url });
         res.status(201).json({ msg: 'has been success..' })
      } catch (error) {
         console.log(error)
      }
   })
}

export const updateData = async (req, res) => {
   const Product = await product.findOne({
      where: {
         id: req.params.id
      }
   })

   if (!Product) return res.status(404).json({ msg: 'Data not found' })
   let fileName = "";
   if (req.file === null) {
      fileName = product.image;
   } else {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = ['.png', '.jpg', '.jpeg'];

      if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid image' })
      if (fileSize > 5000000) return res.status(422).json({ mgs: 'Gambar terlalu besar!' })

      const filePath = `./public/images/${Product.image}`
      fs.unlinkSync(filePath)

      file.mv(`./public/images/${fileName}`, (err) => {
         if (err) return res.status(500).json({ msg: err.message })
      })
   }

   const name = req.body.title;
   const url = `${req.protocol}://${req.get("host")}/images/${fileName}`

   try {
      await product.update({ name: name, image: fileName, url: url }, {
         where: {
            id: req.params.id
         }
      })
      res.status(200).json({ msg: 'has been updated' })
   } catch (error) {
      console.log(error)
   }

}

export const deleteData = async (req, res) => {
   const Product = await product.findOne({
      where: {
         id: req.params.id
      }
   })

   if (!Product) return res.status(404).json({ msg: 'Data not found' })

   try {
      const filePath = `./public/images/${Product.image}`
      fs.unlinkSync(filePath)
      await product.destroy({
         where: {
            id: req.params.id
         }
      })
      res.status(200).json({ msg: 'Product deleted' })
   } catch (error) {
      console.log(error)
   }
}