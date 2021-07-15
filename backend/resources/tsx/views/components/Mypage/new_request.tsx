import React from 'react';
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

export const New_request = () => {
    return (
        <div>
            <div className="info">
                <h2 className="text-2">希望を入力してください</h2> 
                
                <div className="form">
                    <input type="text" className="form-text" placeholder="予算">
                    </input>
                    <div className="select">
                        <select className="form-text" placeholder="お住まいの地域">
                            <option value="お住まいの地域">お住まいの地域1</option>
                            <option value="お住まいの地域">お住まいの地域2</option>
                            <option value="お住まいの地域">お住まいの地域3</option>
                            <option value="お住まいの地域">お住まいの地域4</option>
                        </select>
                    </div>
                    
                    <textarea  className="form-text" placeholder="備考">
                    </textarea>
                </div>
                
                <div className="estimate1">
                    {/* <a href="/account/request/new/complete"><button className="round-btn bg-black my-1">一斉見積もりを送信</button></a>     */}
                    <Link to="/account/request/new/complete"><button className="round-btn bg-black my-1">一斉見積もりを送信</button></Link>    
                </div>
                
            </div>
        </div>
    );
}
