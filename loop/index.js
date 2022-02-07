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

	users.data.forEach(async (user, index) => {

		const {name_sei, name_mei, name_sei_kana, name_mei_kana} = user;
		await sleep(index);
		console.log("🐳", name_sei, name_mei, name_sei_kana, name_mei_kana)
		// const request = execSync('curl ' + path).toString();
		// console.log(result);
	})

	console.log("終了！！")
}

// 実行
// awaitはトップレベルで使うことができない(ES2017時点)ので
// asyncをつけた即時関数を作って呼び出している
(async ()=>{
	console.log("同期的に呼び出す")
	await syncLoop()
}).call();