import React from 'react';
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

export const New_complete = () => {
    return (
        <div>
            <div className="info">
                <h2 className="text-1">一斉送信が完了しました</h2> 
                <h3>マッチした場合、ダイレクトメッセージが届きます。</h3>

                {/* <a href="/account/mypage/"><div className="text-center complete">プロフィール詳細へ戻る</div></a> */}
                <Link to="/account/mypage/"><div className="text-center complete">プロフィール詳細へ戻る</div></Link>
                
            </div>
        </div>
    );
}
