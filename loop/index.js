const { execSync } = require('child_process');
const { param } = require('./param')
const { users } = require('./userData');

// 引数に指定した秒数だけ待つsleep関数
// Promiseを返す
function sleep(second) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, second * 1000)
	})
}

async function syncLoop() {

	for (const user of users.data) {
		const index = users.data.indexOf(user);

		const {name_sei, name_mei, name_sei_kana, name_mei_kana} = user;
		await sleep(index);
		console.log("🐳", name_sei, name_mei, name_sei_kana, name_mei_kana);

		const requestData = {
			"user_in_facility": {
				...param.data.user_in_facility,
				name_sei,
				name_mei,
				name_sei_kana,
				name_mei_kana
			},
			"user_in_facility_shisetsunyusho": {
				...param.data.user_in_facility_shisetsunyusho
			}
		};
		// console.log("🐸", requestData)

		const path = "http://localhost/v202104/mgr/facility/users/new";
		const header = `Content-Type: application/json, X-Requested-With: XMLHttpRequest, Authorization: `;
		const requestCommand = `curl -X POST ${path} -H ${header} -d ${requestData}`

		// const request = execSync('curl ' + path).toString();
		// console.log(result);
	}
}

// 実行
// awaitはトップレベルで使うことができない(ES2017時点)ので
// asyncをつけた即時関数を作って呼び出している
(async ()=>{
	console.log("同期的に呼び出す")
	await syncLoop()
})().then(
	console.log("終了！！")
);