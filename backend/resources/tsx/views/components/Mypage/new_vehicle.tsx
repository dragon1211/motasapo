import React from 'react';
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

export const New_vehicle = () => {
    return (
        <div>
            <div className="info">
                <h2 className="text-1">車かバイクを選択してください</h2> 
                <div className="checkbox">  
                    <label className="container">車
                        <input type="radio"   name="vehicle" defaultChecked />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">バイク
                        <input type="radio"  name="vehicle" />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="estimate">
                    <Link to="/account/request/new/image/">
                    <button className="round-btn bg-black my-1">次のステップへ</button></Link>     
                    {/* <a href="/account/request/new/image/">
                    <button className="round-btn bg-black my-1">次のステップへ</button></a>      */}
                </div>
            </div>
        </div>
    );
}
