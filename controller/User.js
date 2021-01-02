const userModel = require('../model/User.js');
const response = require('../config/response');
const bcrypt = require('bcrypt');

//Fungsi Registrasi
//"data" merupakan parameter yang diambil dari response dan "data" ini berisi input/response dari client
exports.registrasi = (data) =>
	new Promise((resolve, reject)=>{
		//Query untuk mencari (Apakah username yang client masukan ada yang sama dengan yang sudah tersimpan di database)
		userModel.findOne({userName: data.userName})
		
		//Jika Username sudah terdaftar maka kirimkan response "Username sudah digunakan"
		.then(user => {
			if(user){
				resolve(response.commonErrorMsg('Username tidak tersedia'))
				// Jika belum digunakan maka proses pendaftaran dilanjutkan, namun password harus melalui proses enkripsi terlebih
				// dahulu dengan bcrypt.hash()
			}else{
				bcrypt.hash(data.password, 10, (err, hash)=>{
					if(err){
						reject(response.commonErrorMsg)
					}else{
						data.password = hash
						userModel.create(data)
						.then(() => resolve(response.commonSuccessMsg('Berhasil Menyimpan')))
						.catch(() => reject(response.commonErrorMsg('Terjadi kesalaha pada server')))
					}
				})
			}
		}).catch(() => reject(response.commonError))
	})

	//Fungsi Login
	exports.login = (data) =>
		new Promise((resolve, reject) => {
			userModel.findOne({
				userName: data.userName
			}).then(user => {
				if (user) {
					if (bcrypt.compareSync(data.password, user.password)){
						resolve(response.commonResult(user))
					}else{
						reject(response.commonErrorMsg('Password salah'))
					}
				}else{
					reject(response.commonErrorMsg('Username tidak terdaftar'))
				}
			})
		})