import React from 'react';
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';




export const New_type = () => {
    return (
        
            <div>
                <div className="info">
                    <h2 className="text-1">希望を選んでください</h2>
                    <div className="checkbox">
                        <label className="container">購入
                            <input type="radio" name="type" defaultChecked />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">買取
                            <input type="radio" name="type" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">カスタム
                            <input type="radio" name="type" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="estimate">
                        <Link to="/account/request/new/vehicle/">
                            <button className="round-btn bg-black my-1">次のステップへ</button>
                        </Link>
                        {/* <a href="/account/request/new/vehicle/">
                            <button className="round-btn bg-black my-1">次のステップへ</button>
                        </a>       */}
                    </div>
                </div>
            </div>
    );
}
