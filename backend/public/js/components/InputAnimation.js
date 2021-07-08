/**
 * 初期時に入力情報があった場合はクラスを付与
 */
window.onload = function() {
    tags.forEach(function(tag) {
        // inputの文字数を取得
        let number = tag.value.length;
        // inputの文字数が0文字以外の場合
        if(number !== 0) {
            // 1文字以上ある場合はis-textクラスを付与
            tag.previousElementSibling.classList.add("is-text")
        } else {
            // 1文字もない場合はis-textクラスを削除
            tag.previousElementSibling.classList.remove("is-text")
        }
    })
}

/**
 * focus時のアニメーション
 * focus時の文字列判定
 */
// collectionでインプット要素を取得
let tags = document.getElementsByClassName('c-input__target');
// collectionを配列に変換
tags = Array.from( tags ) ;
// collectionなのでforEach文で繰り返し処理
tags.forEach(function(tag) {
    // フォーカスした際に隣接のlabelにis-activeクラスを付与
    tag.addEventListener('focusin', () => {
        tag.previousElementSibling.classList.add("is-active")
    })
    // フォーカスを外した際にis-activeクラスを削除
    tag.addEventListener('focusout', () => {
        tag.previousElementSibling.classList.remove("is-active")
    })

    // inputの入力時に実行
    tag.addEventListener("input",function() {
        // inputの文字数を取得
        let number = tag.value.length;
        // inputの文字数が0文字以外の場合
        if(number !== 0) {
            // 1文字以上ある場合はis-textクラスを付与
            tag.previousElementSibling.classList.add("is-text");
            // inputの赤線がある場合、赤線を消す
            if(tag.classList.contains('is-invalid') == true) {
                tag.classList.remove("is-invalid");
            }
            // spanタグを削除する
            if(tag.nextElementSibling) {
                tag.nextElementSibling.remove();
            }
        } else {
            // 1文字もない場合はis-textクラスを削除
            tag.previousElementSibling.classList.remove("is-text");
        }
    })
})
