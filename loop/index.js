const { execSync } = require('child_process');
const { param } = require('./param')
const { users } = require('./userData');
require('dotenv').config();

// 引数に指定した秒数だけ待つsleep関数
// Promiseを返す
const sleep = (second) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, second * 1000)
	})
}

const syncLoop = async () => {

	for (const user of users.data) {
		const index = users.data.indexOf(user);

		// 1sごとに処理を実行する
		await sleep(index);

		const {name_sei, name_mei, name_sei_kana, name_mei_kana} = user;
		console.log("🐳", `${name_sei} ${name_mei}のデータを登録します`);

		const requestData = JSON.stringify({
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
		});

		const path = "http://localhost/v202104/mgr/facility/users/new";
		const auth = process.env.AUTH_VALUE;
		const contentType = "Content-Type: application/json";
		const xRequestWith = "X-Requested-With: XMLHttpRequest";
		const authorization = `Authorization: ${auth}`;

		const requestCommand = `curl -sS -o "loop/log.txt" -X POST "${path}" -H "${contentType}" -H "${xRequestWith}" -H "${authorization}" -d '${requestData}'`;

		execSync(requestCommand).toString();

		console.log("🐥", `${name_sei} ${name_mei}のデータを登録作業が終わりました`);
	}

	console.log("同期的実行終了")
}

// 実行
// awaitはトップレベルで使うことができない(ES2017時点)ので
// asyncをつけた即時関数を作って呼び出している
(async ()=>{
	console.log("同期的実行開始")
	await syncLoop()
})();