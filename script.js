//'use strict'
// 1行目に記載している 'use strict' は削除しないでください

console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
console.log("hello final_script.js!");

// グローバル変数
let mouse_target = "";
let counter = 1;
// let result_ = {};



//////////////////////////////////////////////////////////////////////////////
// canvasの設定
//////////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById('canvas');
canvas.setAttribute("width", "850");
canvas.setAttribute("height", "420");
// canvas.style.top = 200 ;
// canvas.translate = (100, 250) ;

// canvas.style.width = "2000px" ;

// 前ページなどから取得したimgNo.
const img_choice = 1 ;
let front = "" ;
let back = "" ;
let inner = "" ;

let c1 = canvas.getContext('2d');

// Image オブジェクトを生成
let canvas_img = new Image();

if (img_choice === 0) {
    front = 'img/kazmax.jpg';
    back  = "img/kazmax.jpg" ;
    inner = "img/kazmax.jpg" ;
    canvas_img.src = 'img/kazmax.jpg';
} else if (img_choice === 1) {
    front = 'img/landcruiser_front.jpg';
    back  = "img/landcruiser_back.jpg" ;
    inner = "img/landcruiser_inner.jpg" ;
} else if (img_choice === 2) {
    front = 'img/alphard_front.jpg';
    back  = "img/alphard_back.jpg" ;
    inner = "img/alphard_inner.jpg" ;
}

canvas_img.src = front ;
document.getElementById("front_img").src = front ;
document.getElementById("back_img").src = back ;
document.getElementById("inner_img").src = inner ;




// 画像読み込み終了してから描画
canvas_img.onload = function () {
    c1.drawImage(canvas_img, 0, 0, canvas.width, canvas.height);
    c1.translate = (850, 420);
    // c1.translate = (1000, 2500);
}


//////////////////////////////////////////////////////////////////////////////
// ページの読込みが完了したら動作を実行
//////////////////////////////////////////////////////////////////////////////
window.onload = function () {
    // マウス移動時のイベントをBODYタグに登録する
    document.body.addEventListener("mousemove", function (e) {

        //座標を取得する
        let mX = e.offsetX;  //X座標
        let mY = e.offsetY;  //Y座標
        // 出力先のidを取得
        const mouse = document.getElementById("mouse_div");
        if (mouse_target === "canvas") {
            mouse.innerHTML = `現在のマウス座標　( ${mX} : ${mY} )`;
        } else {
            mouse.innerHTML = `現在のマウス座標　( - : - )`;
        }

    });


    // マウスの位置を取得
    document.body.addEventListener("mouseover", function (event) {
        mouse_target = event.target["id"];
        // document.getElementById("mouse_elme").value = event.target["id"];
        //event.targetの部分がマウスオーバーされている要素
    })

    // マウスクリックされた場合
    document.body.addEventListener("mousedown", function (e) {
        //座標を取得する
        let mX = e.offsetX;  //X座標
        let mY = e.offsetY;  //Y座標

        if (mouse_target === "canvas") {
            // document.getElementById("static_x").value = mX;
            // document.getElementById("static_y").value = mY;


            // 色を変えたいけど変わらない…
            c1.strokeStyle = "bule";
            c1.fillStyele = "red";

            // pinを作成
            c1.beginPath();
            // 下側の三角形
            c1.moveTo(mX, mY);
            c1.lineTo(mX + 9, mY - 13);
            c1.lineTo(mX - 9, mY - 13);
            c1.fill();
            // 上側の円弧
            c1.arc(mX, mY - 13, 9, 180 * Math.PI / 180, 0 * Math.PI, false);
            c1.fill();

            const firstViewElement = document.getElementById('Result_Table');
            firstViewElement.insertAdjacentHTML('beforeend', `<th>${counter}</th><th>${mX}</th><th>${mY}</th><th><input type='text' id="input_reason"></th>`);

            counter++;

        } else if (mouse_target === "back_img") {
            canvas_img.src = back;
        } else if (mouse_target === "front_img") {
            canvas_img.src = front;
        } else if (mouse_target === "inner_img") {
            canvas_img.src = inner;
        }

    })


}


//////////////////////////////////////////////////////////////////////////////
// Finishボタンクリック時の挙動
//////////////////////////////////////////////////////////////////////////////
const finish_btn = document.querySelector("#Finish_btn")
finish_btn.addEventListener("click", () => {
    let conf = confirm("選択結果を回答しますか？");

    if (conf === true) {

        const table = document.getElementById("Result_Table");
        let data_csv = "";
        // const cells = Result.querySelectorAll("td") ;
        // cells.forEach( (cell) => console.log(cell.innerText)) ;

        // 結果の取得
        for (let row of table.rows) {
            for (let column = 0; column < row.cells.length; column++) {
                console.log(row.cells[column].innerHTML);
                data_csv += row.cells[column].innerText;       // data_csvに格納
                if (column === row.cells.length - 1) {
                    data_csv += "\n";
                } else {
                    data_csv += ",";
                }
            }
        }
        console.log(data_csv);

        // Downloadボタンを作りたい

        const top = document.getElementById("Top");
        const ttt = document.getElementById("Result_Section");

        let btn = document.createElement("button");
        let test = document.createElement("p");
        test.innerHTML = "test";
        btn.id = "download";
        btn.innerHTML = "download";
        console.log(btn);
        // top.appendChild(test) ;
        ttt.appendChild(btn);




        c1.clearRect(0, 0, canvas.width, canvas.height);
        c1.drawImage(canvas_img, 0, 0, canvas.width, canvas.height);
        const DelViewElement = document.getElementById('Result_Table');
        DelViewElement.remove();

        const CretViewElement = document.getElementById('Result_Section');

        CretViewElement.insertAdjacentHTML('beforeend', "<table id='Result_Table'><tr><th>No.</th><th>X座標</th><th>Y座標</th><th>どんなところが？(任意)</th></tr></table>")
        counter = 1;
        alert("選択結果が送信されました！！\nご協力ありがとうございました！！");

    }

});

//////////////////////////////////////////////////////////////////////////////
// Clearボタンクリック時の挙動
//////////////////////////////////////////////////////////////////////////////
const clear_btn = document.querySelector("#Clear_btn")
clear_btn.addEventListener("click", () => {
    c1.clearRect(0, 0, canvas.width, canvas.height);
    c1.drawImage(canvas_img, 0, 0, canvas.width, canvas.height);
    const DelViewElement = document.getElementById('Result_Table');
    DelViewElement.remove();

    const CretViewElement = document.getElementById('Result_Section');

    CretViewElement.insertAdjacentHTML('beforeend', "<table id='Result_Table'><tr><th>No.</th><th>X座標</th><th>Y座標</th><th>どんなところが？(任意)</th></tr></table>")
    counter = 1;
});

