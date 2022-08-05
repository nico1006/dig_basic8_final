//'use strict'
// 1行目に記載している 'use strict' は削除しないでください

console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
console.log("hello final_script.js!");

// グローバル変数
let mouse_target = "";
let counter = 1;
let data_csv = "";



// const link_test_id01 = document.getElementById("link_test") ;
// console.log(link_test_id01) ;

// const link_test_id = document.getElementById("link_test02") ;
// link_test_id.href = "nishi_top.html" ;
// link_test_id.innerHTML = '<a href="nishi_top.html">link_test02</a>' ;
// console.log(link_test_id) ;
// link_test_id.innerHTML ="<a href='nishi_top.html'>new test</a>"


//////////////////////////////////////////////////////////////////////////////
// canvasの設定
//////////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById('canvas');
canvas.setAttribute("width", "850");
canvas.setAttribute("height", "420");

// 前ページなどから取得したimgNo.
const img_arr = ["kazmax", "landcruiser", "alphard"]
const img_choice = img_arr[2];
let choice_view = "front";
let front = "";
let back = "";
let inner = "";


// Image オブジェクトを生成
let canvas_img = new Image();

if (img_choice === "kazmax") {
    front = 'img/kazmax.jpg';
    back = "img/kazmax.jpg";
    inner = "img/kazmax.jpg";
} else if (img_choice === "landcruier") {
    front = 'img/landcruiser_front.jpg';
    back = "img/landcruiser_back.jpg";
    inner = "img/landcruiser_inner.jpg";
} else if (img_choice === "alphard") {
    front = 'img/alphard_front.jpg';
    back = "img/alphard_back.jpg";
    inner = "img/alphard_inner.jpg";
}

// htmlに表示する画像を設定
canvas_img.src = front;
document.getElementById("front_img").src = front;
document.getElementById("back_img").src = back;
document.getElementById("inner_img").src = inner;

// console.log("---------1-----------");


// 画像読み込み終了してから描画
canvas_img.onload = function () {
    // canvas様のインスタンス作成
    const ctx = canvas.getContext('2d');
    ctx.drawImage(canvas_img, 0, 0, canvas.width, canvas.height);
    ctx.translate = (850, 420);
    ctx.translate = (1000, 2500);
}


//////////////////////////////////////////////////////////////////////////////
// ページの読込みが完了したら動作を実行
//////////////////////////////////////////////////////////////////////////////
window.onload = function () {

    // マウス移動時のイベントをBODYタグに登録する
    document.body.addEventListener("mousemove", function (event) {
        //座標を取得する
        let mX = event.offsetX;  //X座標
        let mY = event.offsetY;  //Y座標
        // 出力先のidを取得
        const mouse = document.getElementById("mouse_div");
        if (mouse_target === "canvas") {
            mouse.innerHTML = `現在のマウス座標　( ${mX} : ${mY} )`;
        } else {
            mouse.innerHTML = `現在のマウス座標　( - : - )`;
        }

    });


    // マウスの位置を取得し、mouse_targetにフラグとして保持
    document.body.addEventListener("mouseover", function (event) {
        mouse_target = event.target["id"];
    })


    // マウスクリックされた場合
    document.body.addEventListener("mousedown", function (event) {
        //座標を取得する
        let mX = event.offsetX;  //X座標
        let mY = event.offsetY;  //Y座標

        if (mouse_target === "canvas") {
            // document.getElementById("static_x").value = mX;
            // document.getElementById("static_y").value = mY;

            // canvas様のインスタンス作成
            const ctx = canvas.getContext('2d');
            // const circle1 = canvas.getContext('2d');
            // const circle2 = canvas.getContext('2d');

            // pinを作成
            ctx.fillStyle = "red";
            // 下側の三角形
            ctx.beginPath();
            ctx.moveTo(mX, mY);
            ctx.lineTo(mX + 9, mY - 13);
            ctx.lineTo(mX - 9, mY - 13);
            // ctx.closePath();
            ctx.fill();

            // 上側の円弧
            ctx.arc(mX, mY - 13, 9, 180 * Math.PI / 180, 0 * Math.PI, true);
            // ctx.closePath() ;
            ctx.fill();

            // 上側の円弧
            // circle2.fillStyle = "white";
            // circle2.arc(mX + 50, mY - 13, 5, 0, 360 , true);
            // circle2.closePath();
            // circle2.fill();

            const firstViewElement = document.getElementById('Result_Table');
            firstViewElement.insertAdjacentHTML('beforeend', `<th>${counter}</th><th>${mX}</th><th>${mY}</th><th>${choice_view}</th><th><input type='text' id="input_reason"></th>`);
            console.log(choice_view);

            counter++;

        } else if (mouse_target === "back_img") {
            canvas_img.src = back;
            choice_view = "back";
        } else if (mouse_target === "front_img") {
            canvas_img.src = front;
            choice_view = "front";
        } else if (mouse_target === "inner_img") {
            canvas_img.src = inner;
            choice_view = "inner";
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
        // const cells = Result.querySelectorAll("td") ;
        // cells.forEach( (cell) => console.log(cell.innerText)) ;

        // 結果の取得
        for (let row of table.rows) {
            for (let column = 0; column < row.cells.length; column++) {
                // console.log(row.cells[column].innerHTML);
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

        // const top = document.getElementById("Top");
        const Result_Section_ID = document.getElementById("Result_Section");

        let download_btn = document.createElement("button");
        let next_btn = document.createElement("button");
        // let test = document.createElement("p");
        // test.innerHTML = "test";
        download_btn.id = "download";
        download_btn.innerHTML = "download";

        next_btn.id = "next";
        next_btn.innerHTML = "<a href='https://makototanabe.github.io/'>あなたの結果はこちら</a>";
        // console.log(download_btn);
        // top.appendChild(test) ;
        Result_Section_ID.appendChild(download_btn);
        Result_Section_ID.appendChild(next_btn);

        // 画像を初期化
        // canvas様のインスタンス作成
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(canvas_img, 0, 0, canvas.width, canvas.height);
        const DelViewElement = document.getElementById('Result_Table');
        DelViewElement.remove();

        const CretViewElement = document.getElementById('Result_Section');

        CretViewElement.insertAdjacentHTML('beforeend', "<table id='Result_Table'><tr><th>No.</th><th>X座標</th><th>Y座標</th><th>view</th><th>どんなところが？(任意)</th></tr></table>")
        counter = 1;
        alert("選択結果が送信されました！！\nご協力ありがとうございました！！");

    }

});

//////////////////////////////////////////////////////////////////////////////
// Clearボタンクリック時の挙動
//////////////////////////////////////////////////////////////////////////////
const clear_btn = document.querySelector("#Clear_btn")
clear_btn.addEventListener("click", () => {

    // canvas様のインスタンス作成
    const ctx = canvas.getContext('2d');


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvas_img, 0, 0, canvas.width, canvas.height);
    const DelViewElement = document.getElementById('Result_Table');
    DelViewElement.remove();

    const CretViewElement = document.getElementById('Result_Section');

    CretViewElement.insertAdjacentHTML('beforeend', "<table id='Result_Table'><tr><th>No.</th><th>X座標</th><th>Y座標</th><th>view</th><th>どんなところが？(任意)</th></tr></table>")
    counter = 1;
});


//////////////////////////////////////////////////////////////////////////////

console.log(data_csv);

// const page_test_id = document.getElementById("page_test");
// page_test_id.innerText = data_csv ;

// console.log("---------end-----------") ;
