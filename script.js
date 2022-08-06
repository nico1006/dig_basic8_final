//'use strict'
// 1行目に記載している 'use strict' は削除しないでください

console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
console.log("hello nishimura's script.js!");

// グローバル変数
let mouse_target = "";
let counter = 1;
let data_csv = "";





//////////////////////////////////////////////////////////////////////////////
// くにしー.htmlから遷移してきた場合に表示させるcanvas
//////////////////////////////////////////////////////////////////////////////
let top_info = true;        // trueの場合くにしー
// let top_info = false;

if (top_info === true) {

    // 文字スペースを表示
    const top_canvas_id = document.getElementById('top_canvas');
    const height = 1200;
    const width = 1200;
    top_canvas_id.setAttribute("width", height);
    top_canvas_id.setAttribute("height", width);

    const top_ctx = top_canvas_id.getContext('2d');
    // top_ctx.fillStyle = 'AliceBlue'; // 図形の色
    top_ctx.fillStyle = "rgba(" + [224, 255, 255, 0.75] + ")"; // 図形の色
    top_ctx.fillRect(0, 0, height, width);

    top_ctx.fillStyle = 'Goldenrod';  // 文字の色
    top_ctx.font = '50px Verdana';
    top_ctx.fillText("ありがとうございます！！", 50, 100);
    top_ctx.fillText("おかげ様で、西村のAlphardが整いました！！", 50, 160);

    const top_ctx2 = top_canvas_id.getContext('2d');
    top_ctx2.fillStyle = 'black';  // 文字の色
    top_ctx.font = '30px Verdana';

    top_ctx2.fillText("続いては、Alphardのカッコイイポイントを教えてください。", 70, 300);
    top_ctx2.fillText("写真は　front/back/inner　があります。", 70, 350);
    top_ctx2.fillText("チェックが完了したら　　　　　　ボタンを押してください。", 70, 400);

    top_ctx2.fillText("~~~性格診断は本チェックが最後です~~~", 70, 700);

    const top_ctx3 = top_canvas_id.getContext('2d');
    top_ctx3.fillStyle = "darkgray"; // 図形の色
    top_ctx3.fillRect(400, 370, 120, 35);
    top_ctx3.fillStyle = 'white';  // 文字の色
    top_ctx3.font = '30px Gosic';
    top_ctx3.fillText("finish", 420, 400);


    document.body.addEventListener("mousedown", function (event) {
        top_canvas_id.remove();
    });

}



//////////////////////////////////////////////////////////////////////////////
// canvasの設定
//////////////////////////////////////////////////////////////////////////////
const main_canvas = document.getElementById('main_canvas');
main_canvas.setAttribute("width", "850");
main_canvas.setAttribute("height", "420");

// 初期画像の設定
const img_arr = ["kazmax", "landcruiser", "alphard"]
let img_choice = img_arr[2];
let choice_view = "front";
let front = "img/alphard_front.jpg";
let back = "img/alphard_back.jpg";
let inner = "img/alphard_inner.jpg";
console.log(`---${img_choice}---`);


// Image オブジェクトを生成
let canvas_img = new Image();

// if (img_choice === "kazmax") {
//     front = 'img/kazmax_front.jpg';
//     back = "img/kazmax_back.jpg";
//     inner = "img/kazmax_inner.jpg";
// } else if (img_choice === "landcruier") {
//     front = 'img/landcruiser_front.jpg';
//     back = "img/landcruiser_back.jpg";
//     inner = "img/landcruiser_inner.jpg";
// } else if (img_choice === "alphard") {
//     front = 'img/alphard_front.jpg';
//     back = "img/alphard_back.jpg";
//     inner = "img/alphard_inner.jpg";
// }


document.getElementById("kazmax").onclick = function () {
    front = 'img/kazmax_front.jpg';
    back = "img/kazmax_back.jpg";
    inner = "img/kazmax_inner.jpg";

    img_drowing();
    Clear_Window();
    img_choice = img_arr[0];
    console.log(`---${img_choice}---`);

}

document.getElementById("landcruiser").onclick = function () {
    front = 'img/landcruiser_front.jpg';
    back = "img/landcruiser_back.jpg";
    inner = "img/landcruiser_inner.jpg";

    img_drowing();
    Clear_Window();
    img_choice = img_arr[1];
    console.log(`---${img_choice}---`);

}

document.getElementById("alphard").onclick = function () {
    front = 'img/alphard_front.jpg';
    back = "img/alphard_back.jpg";
    inner = "img/alphard_inner.jpg";

    img_drowing();
    Clear_Window();
    img_choice = img_arr[2];
    console.log(`---${img_choice}---`);
}


//////////////////////////////////////////////////////////////////////////////
// 画像を読み込む関数
//////////////////////////////////////////////////////////////////////////////
function img_drowing() {

    // htmlに表示する画像を設定
    canvas_img.src = front;
    document.getElementById("front_img").src = front;
    document.getElementById("back_img").src = back;
    document.getElementById("inner_img").src = inner;

    // console.log("---------1-----------");

    // 画像読み込み終了してから描画
    canvas_img.onload = function () {
        // canvas様のインスタンス作成
        const ctx = main_canvas.getContext('2d');
        ctx.drawImage(canvas_img, 0, 0, main_canvas.width, main_canvas.height);
        ctx.translate = (850, 420);
        // console.log("-----2-------");

    }
}
img_drowing();

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
        if (mouse_target === "main_canvas") {
            mouse.innerHTML = `現在のマウス座標　( ${mX} : ${mY} )`;
        } else {
            mouse.innerHTML = `現在のマウス座標　( - : - )`;
        }
        // console.log("-----on-------");

    });


    // マウスの位置を取得し、mouse_targetにフラグとして保持
    document.body.addEventListener("mouseover", function (event) {
        mouse_target = event.target["id"];
        // console.log(mouse_target);
    })


    // マウスクリックされた場合
    document.body.addEventListener("mousedown", function (event) {
        //座標を取得する
        let mX = event.offsetX;  //X座標
        let mY = event.offsetY;  //Y座標
        // console.log("-----click-------");

        if (mouse_target === "main_canvas") {

            // pinを表示
            ////////////////////////////////////////////////
            // canvas用のインスタンス作成
            const ctx_red = main_canvas.getContext('2d');
            const ctx_white = main_canvas.getContext('2d');

            // pinを作成
            ctx_red.fillStyle = "red";
            // 下側の三角形
            ctx_red.beginPath();
            ctx_red.moveTo(mX, mY);
            ctx_red.lineTo(mX + 9, mY - 13);
            ctx_red.lineTo(mX - 9, mY - 13);
            ctx_red.fill();
            // 上側の円弧
            ctx_red.arc(mX, mY - 13, 9, 180 * Math.PI / 180, 0 * Math.PI, false);
            // ctx_red.closePath();
            ctx_red.fill();
            // 白抜きの円
            ctx_white.fillStyle = "white";
            ctx_white.beginPath();
            ctx_white.arc(mX, mY - 14, 5, 0, 360, false);
            ctx_white.fill();
            ctx_white.fillStyle = 'black';
            ctx_white.font = '0.7em Impact';
            ctx_white.fillText(counter, mX - 4, mY - 9);

            // tableに情報を格納
            const firstViewElement = document.getElementById('Result_Table');
            firstViewElement.insertAdjacentHTML('beforeend', `<th>${counter}</th><th>${mX}</th><th>${mY}</th><th>${choice_view}</th><th><input type='text' id="input_reason${counter}"></th>`);
            console.log("--click:", choice_view);

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
        let id_num = 0 ;
        for (let row of table.rows) {
            for (let column = 0; column < row.cells.length; column++) {
                data_csv += row.cells[column].innerText;       // data_csvに格納
                if (column === row.cells.length - 1) {
                    data_csv += "\n";
                } else if (column === row.cells.length-2 && id_num !== 0){
                    let table_input_id = document.getElementById(`input_reason${id_num}`)
                    data_csv += "," + table_input_id.value ;
                } else if(column === row.cells.length-3 && id_num !== 0){
                    data_csv += `,${img_choice}-`;
                }else {
                    data_csv += ",";
                }
            }
            id_num++ ;
        }
        console.log(data_csv);
        data_csv = [];      // data_csvの初期化


        // downloarボタン、性格診断結果ページボタンを作成
        const Result_Section_ID = document.getElementById("Result_Section");

        // let download_btn = document.createElement("button");
        // download_btn.id = "download";
        // download_btn.innerHTML = "download";
        // Result_Section_ID.appendChild(download_btn);

        let next_btn = document.createElement("button");
        next_btn.id = "next";
        next_btn.innerHTML = "<a href='https://makototanabe.github.io/'>あなたの性格診断結果</a>";
        Result_Section_ID.appendChild(next_btn);

        Clear_Window();
        alert("選択結果が送信されました！！\nご協力ありがとうございました！！");

    }

});

//////////////////////////////////////////////////////////////////////////////
// Clearボタンクリック時の挙動
//////////////////////////////////////////////////////////////////////////////
const clear_btn = document.querySelector("#Clear_btn")
clear_btn.addEventListener("click", () => {
    Clear_Window();

});


//////////////////////////////////////////////////////////////////////////////
// canvasおよびtableの初期化
//////////////////////////////////////////////////////////////////////////////
function Clear_Window() {

    // canvasの初期化
    const ctx_clear = main_canvas.getContext('2d');
    ctx_clear.clearRect(0, 0, main_canvas.width, main_canvas.height);
    ctx_clear.drawImage(canvas_img, 0, 0, main_canvas.width, main_canvas.height);

    // tableの初期化
    const DelViewElement = document.getElementById('Result_Table');
    DelViewElement.remove();
    const CretViewElement = document.getElementById('Result_Section');
    CretViewElement.insertAdjacentHTML('beforeend', "<table id='Result_Table'><tr><th>No.</th><th>X座標</th><th>Y座標</th><th>View</th><th>どんなところが？(任意)</th></tr></table>")
    counter = 1;
}


//////////////////////////////////////////////////////////////////////////////

// console.log("---------end-----------") ;