import React from 'react';
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

export const New_detail = () => {
    return (
        <div>
            <div className="info">
                <h2 className="text-2">詳細を入力してください</h2> 
                
                <form>
                    <input type="text" className="form-text" placeholder="ブランド名">
                    </input>
                    <input type="text" className="form-text" placeholder="車種">
                    </input>
                    <input type="text" className="form-text" placeholder="グレード">
                    </input>
                    <input type="text" className="form-text" placeholder="色">
                    </input>
                    <input type="text" className="form-text" placeholder="走行距離">
                    </input>
                </form>

                <div className="estimate1 ">
                    {/* <a href="/account/request/new/request"><button className="round-btn bg-black my-1">最後のステップへ</button>
                    </a>         */}
                    <Link to="/account/request/new/request"><button className="round-btn bg-black my-1">最後のステップへ</button>
                    </Link>        
                </div>
                
            </div>
        </div>
    );
}
