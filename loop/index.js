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
		console.log("🐳", `${name_sei} ${name_mei}のデータを登録します`);

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
		// const requestData = param.data;
		console.log("🐟",requestData);

		const path = "http://localhost/v202104/mgr/facility/users/new";
		const auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3YxXC9tZ3JcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ0MzM1MTk0LCJleHAiOjE2NDQzNTMxOTQsIm5iZiI6MTY0NDMzNTE5NCwianRpIjoiVnhrajd4clBRTURVUEoxUiIsInN1YiI6Mzg2MywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.Yv3wdSdv7nBsdzx01koUERyu6ws7plgr4ZHuk2KTDIU"
		const contentType = "Content-Type: application/json";
		const xRequestWith = "X-Requested-With: XMLHttpRequest";
		const authorization = `Authorization: ${auth}`;
		const requestCommand = `curl -X POST "${path}" -H "${contentType}" -H "${xRequestWith}" -H "${authorization}" -d "${requestData}"`;

		// const requestCommand = `curl -X POST 'http://localhost/v202104/mgr/facility/users/new' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"' -H 'sec-ch-ua-mobile: ?0' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3YxXC9tZ3JcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ0MzM1MTk0LCJleHAiOjE2NDQzNTMxOTQsIm5iZiI6MTY0NDMzNTE5NCwianRpIjoiVnhrajd4clBRTURVUEoxUiIsInN1YiI6Mzg2MywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.Yv3wdSdv7nBsdzx01koUERyu6ws7plgr4ZHuk2KTDIU' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36' -H 'X-Knowbe-Facility-id: 496' -H 'sec-ch-ua-platform: "macOS"' -H 'Origin: http://localhost:3000' -H 'Sec-Fetch-Site: same-site' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Dest: empty' -H 'Referer: http://localhost:3000/' -H 'Accept-Language: ja,en-US;q=0.9,en;q=0.8' --data-raw '${requestData}' --compressed`

		console.log("🐙", requestCommand);
		const request = execSync(requestCommand).toString();
		console.log(request);
		console.log("🐥", `${name_sei} ${name_mei}のデータを登録完了しました`);
	}

	console.log("終了！！")
}

// 実行
// awaitはトップレベルで使うことができない(ES2017時点)ので
// asyncをつけた即時関数を作って呼び出している
(async ()=>{
	console.log("同期的実行開始")
	await syncLoop()
})();