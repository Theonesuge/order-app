const request = (url, type, data = {}, header) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: url,
			data: data,
			header: header,
			dataType: 'json',
		}).then((response) => {
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
export default request
