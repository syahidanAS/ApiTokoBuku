//Response ini untuk validasi yang akan dikirimkan kepada client
module.exports = {
	commonError : {
		error : true,
		msg : 'Terjadi kesalahan pada server'
	},
	commonErrorMsg : (msg) =>{
		return{
			error : true, 
			msg : msg
		}
	},
	commonSuccess : {
		error : false,
		msg : 'Berhasil memuat permintaan'
	},
		commonSuccessMsg : (msg) =>{
		return{
			error : false, 
			msg : msg
		}
	},
	commonResult : 	(data) =>{
		return{
			error : false,
			msg : 'Berhasil memuat data',
			data : data
		}
	}
};