import React, {Component} from 'react';
import {PersonInfo} from './personInfo';
import {test_data} from './test';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class GPS extends Component {
    render(){
      return (
            <div>
                <h2 className="center my-2">GPS</h2>
                <div className="map-size">
                    <img src='/storage/base/map.png' width="100%" height="100%"/>
                </div>
                <div className="wrap-info">
                    <div className="row f">
                        <div className="col-sm-4 my-1">
                            <button className="round-btn">全て</button>
                        </div>
                        <div className="col-sm-4 my-1">
                            <button className="round-btn">ショップのみ</button>
                        </div>
                        <div className="col-sm-4 my-1">
                            <button className="round-btn">ユーザー</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 my-1">
                            <button className="round-btn">ユーザー：男性のみ</button>
                        </div>
                        <div className="col-sm-6 my-1">
                            <button className="round-btn">ユーザー：女性のみ</button>
                        </div>
                    </div>
                    {
                        test_data.map( item =><PersonInfo data = {item}/> )                                                      
                    }
                </div>
            </div>
       );
    }
}
export default GPS;