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

    for(const currentItem of items){
        const li = document.createElement('li');
        const input = document.createElement('input');
        const deleteBtn = document.createElement('button');
    
        //選択肢のオプション
        input.type = 'text'
        input.placeholder = '選択肢を入力'
        input.value = currentItem;  //デフォルトの選択肢を入力欄に表示
        deleteBtn.textContent = '×';
        deleteBtn.classList.add('delete-btn');

        //削除ボタンのクリックイベント付与
        deleteBtn.addEventListener('click', DeleteButton);
        li.appendChild(input);
        li.appendChild(deleteBtn);
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
    const deleteBtn = document.createElement('button');
    
    //選択肢のオプション
    input.type = 'text'
    input.placeholder = '選択肢を入力'
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-btn');

    //削除ボタンのクリックイベント付与
    deleteBtn.addEventListener('click', DeleteButton);

    //2つ以上の選択肢があるとき、削除ボタンを表示する
    if(itemsList.children.length ==1){

        const firstDeleteBtn = document.createElement('button');
        firstDeleteBtn.textContent = '×';
        firstDeleteBtn.classList.add('delete-btn');
        firstDeleteBtn.addEventListener('click',DeleteButton);

        itemsList.children[0].appendChild(firstDeleteBtn);
    }   
    

    li.appendChild(input);
    li.appendChild(deleteBtn);
    itemsList.appendChild(li);
    updateItemList(); 

});



function DeleteButton(){

    const targetLi = this.parentElement;    //ボタンの親のliを取得
    itemsList.removeChild(targetLi);
    updateItemList();

    if(itemsList.children.length == 1){
        const remainingLi = itemsList.children[0];
        const remainingBtn = remainingLi.querySelector('.delete-btn');
        remainingBtn.remove();
    }
};


//itemsの中身を全部、表示する、おそらくここに問題があり、deleteを押しても更新されません。
function updateItemList(){
    const inputs = itemsList.querySelectorAll('input');
    items = Array.from(inputs).map(input => input.value);

    // currentIndexが範囲外になったらリセット
    if(currentIndex >= items.length){
        currentIndex = 0;
    }

    rouletteItem.textContent = items[currentIndex];
}


