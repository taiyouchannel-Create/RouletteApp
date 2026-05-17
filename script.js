//ルーレットの選択肢操作
const addItemBtn = document.getElementById('addItemBtn');
const itemsList = document.getElementById('itemsList');


// ルーレットの動作操作
const rouletteItem = document.getElementById('rouletteItem');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resultDisplay = document.getElementById('result');

// デフォルトの選択肢
let items = ['選択肢1', '選択肢2', '選択肢3'];


// ページ読み込み時に初期状態を設定
window.addEventListener('DOMContentLoaded', () => {
    rouletteItem.textContent = items[0];

    for(const currentItem of items){
        const li = createSettingLi(currentItem);
        itemsList.appendChild(li);
    }
});



//ルーレット設定
let isRunning = false;
let currentIndex = 0;
let animationInterval;

startBtn.addEventListener('click', startRoulette);
stopBtn.addEventListener('click', stopRoulette);

//ルーレットの開始
function startRoulette() {
    if (isRunning) return;

    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resultDisplay.textContent = '-';

    //ルーレット中は入力項目追加できないようにする
    addItemBtn.disabled = true;
    itemsList.querySelectorAll('input').forEach(input => input.disabled = true);
    itemsList.querySelectorAll('.delete-btn').forEach(btn => btn.disabled = true);

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


    //入力項目の操作可能に戻す
    addItemBtn.disabled = false;
    itemsList.querySelectorAll('input').forEach(input => input.disabled = false);
    itemsList.querySelectorAll('.delete-btn').forEach(btn => btn.disabled = false);
}

//ボタンによる選択肢の追加
addItemBtn.addEventListener('click', () => {

    const li = createSettingLi();

    //2つ以上の選択肢があるとき、削除ボタンを表示する
    if(itemsList.children.length ==1){

        const firstDeleteBtn = document.createElement('button');
        firstDeleteBtn.textContent = '×';
        firstDeleteBtn.classList.add('delete-btn');
        firstDeleteBtn.addEventListener('click',deleteButton);

        itemsList.children[0].appendChild(firstDeleteBtn);
    }   
    

    itemsList.appendChild(li);
    

});


function createSettingLi(value = ''){
    const li = document.createElement('li');
    const input = document.createElement('input');
    const deleteBtn = document.createElement('button');
    
    //選択肢のオプション
    input.type = 'text'
    input.placeholder = '選択肢を入力'
    input.value = value;  //デフォルトの選択肢を入力欄に表示
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-btn');

    //入力時のイベント付与
    input.addEventListener('input', updateItemList);

    //削除ボタンのクリックイベント付与
    deleteBtn.addEventListener('click', deleteButton);

    li.appendChild(input);
    li.appendChild(deleteBtn);
    return li;

}



function deleteButton(){

    const targetLi = this.parentElement;    //ボタンの親のliを取得
    itemsList.removeChild(targetLi);

    if(itemsList.children.length == 1){
        const remainingLi = itemsList.children[0];
        const remainingBtn = remainingLi.querySelector('.delete-btn');
        remainingBtn.remove();
    }

    updateItemList();
};


//itemsの中身を全部、表示する
function updateItemList(){
    const inputs = itemsList.querySelectorAll('input');
    items = Array.from(inputs).map(input => input.value);


    // currentIndexが範囲外になったらリセット、ルーレット続けて処理するときに必要
    if(currentIndex >= items.length){
        currentIndex = 0;
    }

    rouletteItem.textContent = items[currentIndex];
}



