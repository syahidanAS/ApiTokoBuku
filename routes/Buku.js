const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const buku = require('../controller/Buku')

var storage = multer.diskStorage({
	filename: function(req,file,cb){
		let ext = file.originalname.substring(
				file.originalname.lastIndexOf("."),
				file.originalname.length
			)
		cb(null, "iBooks-"+ Date.now() + ext);
	},
	destination: function(req,file,cb){
		cb(null, './gambar')
	}
})

var upload = multer({storage: storage}).single("gambar")

router.post("/tambah", upload, (req, res) =>{
	buku.inputDataBuku(req.body, req.file.filename)
		.then((result) => res.json(result))
		.catch((err) => res.json(err))
})

router.get("/list",(req,res)=>{
	buku.lihatDataBuku()
	.then((result) => res.json(result))
	.catch((err) => res.json(err))
})

router.get("/list/:id",(req,res)=>{
	buku.lihatDetailDataBuku(req.params.id)
	.then((result) => res.json(result))
	.catch((err) => res.json(err))
})

router.delete("/hapus/:id",(req,res)=>{
	buku.hapusBuku(req.params.id)
	.then((result) => res.json(result))
	.catch((err) => res.json(err))
})

router.put("/ubah/:id",upload, (req,res)=>{
	buku.updateBuku(req.params.id, req.body, req.file.filename)

	.then((result) => res.json(result))
	.catch((err) => res.json(err))
})

router.put("/cleanUpdate/:id", (req,res)=>{
	buku.updateBukuClean(req.params.id, req.body)
	.then((result) => res.json(result))
	.catch((err) => res.json(err))
})

module.exports = router