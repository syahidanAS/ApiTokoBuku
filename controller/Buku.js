const buku = require('../model/Buku.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataBuku = (data, gambar) =>
	new Promise(async(resolve, reject) => {

		const bukuBaru = new buku({
			kodeBuku 	: data.kodeBuku,
			judulBuku 	: data.judulBuku,
			penerbit 	: data.penerbit,
			pengarang 	: data.pengarang,
			tahunTerbit : data.tahunTerbit,
			hargaBuku 	: data.hargaBuku,
			gambar 		: gambar
		})
		await buku.findOne({kodeBuku: data.kodeBuku})
			.then(buku => {
				if(buku){
					reject(response.commonErrorMsg('Kode buku sudah digunakan'))
				}else{
			bukuBaru.save()
				.then(r => {
				resolve(response.commonSuccessMsg('Berhasil menyimpan data'))
				}).catch(err => {
				reject(response.commonErrorMsg('Gagal menyimpan data'))
				})
				}
			}).catch(err => {
				reject(response.commonErrorMsg('Terjadi kesalahan pada server'))
			})
		// const dataBuku = {
		// 	kodeBuku 	: data.kodeBuku,
		// 	judulBuku 	: data.judulBuku,
		// 	penerbit 	: data.penerbit,
		// 	pengarang 	: data.pengarang,
		// 	tahunTerbit : data.tahunTerbit,
		// 	hargaBuku 	: data.hargaBuku,
		// 	gambar 		: gambar
		// }
		// buku.create(dataBuku)
	}) 

	exports.lihatDataBuku = () =>
		new Promise(async (resolve, reject) =>{
			buku.find({})
				.then(result=>{
						resolve(response.commonResult(result))
				})
				.catch(()=>reject(response.commonErrorMsg('Terjadi kesalahan pada server')))
		})

	exports.lihatDetailDataBuku = (kodeBuku) =>
		new Promise(async (resolve, reject) =>{
			buku.findOne({kodeBuku : kodeBuku})
				.then(result=>{
						resolve(response.commonResult(result))
				})
				.catch(()=>reject(response.commonErrorMsg('Terjadi kesalahan pada server')))
		})

	exports.updateBuku = (id, data, gambar)=>
		new Promise(async (resolve, reject) => {
			await buku.updateOne(
			{_id : ObjectId(id)},
			{
				//data apa yang mau diubah?
				$set:{
					kodeBuku 	: data.kodeBuku,
					judulBuku 	: data.judulBuku,
					penerbit 	: data.penerbit,
					pengarang 	: data.pengarang,
					tahunTerbit : data.tahunTerbit,
					hargaBuku 	: data.hargaBuku,
					gambar 		: gambar
				}
			}
		).then(buku =>{
			resolve(response.commonSuccessMsg('Berhasil mengubah data'))
		}).catch(err => {
			reject(response.commonErrorMsg('Terjadi kesalahan pada server'))
		})
	})


	exports.updateBukuClean = (id, data)=>
		new Promise(async (resolve, reject) => {
			await buku.updateOne(
			{_id : ObjectId(id)},
			{
				//data apa yang mau diubah?
				$set:{
					kodeBuku 	: data.kodeBuku,
					judulBuku 	: data.judulBuku,
					penerbit 	: data.penerbit,
					pengarang 	: data.pengarang,
					tahunTerbit : data.tahunTerbit,
					hargaBuku 	: data.hargaBuku
				}
			}
		).then(buku =>{
			resolve(response.commonSuccessMsg('Berhasil mengubah data'))
		}).catch(err => {
			reject(response.commonErrorMsg('Terjadi kesalahan pada server'))
		})
	})

	
	exports.hapusBuku = (_id) =>
		new Promise(async (resolve, reject) =>{
			await buku.remove({_id: ObjectId(_id)})
			.then(() =>{
				resolve(response.commonSuccessMsg('Berhasil menghapus data'))
			}).catch(err =>{
				reject(response.commonErrorMsg('Terjadi kesalahan pada server'))
			})
		})