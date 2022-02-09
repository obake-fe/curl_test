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
		const auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3YxXC9tZ3JcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ0NDIxNzIwLCJleHAiOjE2NDQ0Mzk3MjAsIm5iZiI6MTY0NDQyMTcyMCwianRpIjoiSU5QMWFsSUlDSlU4Y0pFciIsInN1YiI6Mzg2MywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.m3RxEFbMQQeUb6sSDQk1LrxcM9v3nxtmSqN1eVcF8nU"
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