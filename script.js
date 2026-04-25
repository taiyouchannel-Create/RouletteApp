//ルーレットの選択肢操作
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemsList = document.getElementById('itemsList');


// ルーレットの動作操作
const rouletteItem = document.getElementById('rouletteItem');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resultDisplay = document.getElementById('result');

// デフォルトの選択肢
const items = ['選択肢1', '選択肢2', '選択肢3'];


// ページ読み込み時に初期状態を設定
window.addEventListener('DOMContentLoaded', () => {
    rouletteItem.textContent = items[0];
});



//ルーレット設定
let isRunning = false;
let currentIndex = 0;
let animationInterval;

startBtn.addEventListener('click', startRoulette);
stopBtn.addEventListener('click', stopRoulette);

function startRoulette() {
    if (isRunning) return;

    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resultDisplay.textContent = '-';

    // 高速で切り替え（50ミリ秒ごと）   選択肢1~を連続で表示
    animationInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        rouletteItem.textContent = items[currentIndex];
    }, 50);
}

function stopRoulette() {
    if (!isRunning) return;

    clearInterval(animationInterval);

    // 減速させるアニメーション　
    let slowDownSpeed = 50;
    const slowDownInterval = setInterval(() => {
        slowDownSpeed += 20;
        currentIndex = (currentIndex + 1) % items.length;
        rouletteItem.textContent = items[currentIndex];

        if (slowDownSpeed > 300) {
            clearInterval(slowDownInterval);
            finishRoulette();
        }
    }, slowDownSpeed);
}

function finishRoulette() {
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;

    // 結果を表示
    const selectedItem = items[currentIndex];
    resultDisplay.textContent = selectedItem;
}

//ボタンによる選択肢の追加
addItemBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text'
    input.placeholder = '選択肢を入力'

    updateItemList();//おそらく入力したときのEventListner内に入れるやつやこれ

});


//itemsの中身を全部、表示する
function updateItemList(){
    itemsList.innerHTML = '';  //リストを空にする
    
}


