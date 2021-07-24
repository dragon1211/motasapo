
import React from "react";
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css';
import GlobalNav from '../../layout/GlobalNav';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';






export const MyPageIndex =() => {
  
        return (
        <><div>
                <div className="info">
                    <div className="row">
                        <div className="col-sm-6 text-center">
                            <img className="avatar" src="/storage/base/50000087_1193305484150794_571276761136889856_n.jpeg" alt="chankan.jpg" />
                        </div>
                        <div className="col-sm-6 text-left">
                            <p className="sex">男性</p>
                            <h2>chankan</h2>
                            <p className="name">中澤　寛</p>
                            <div className="row">
                                <div className="follow col-sm-4 ">
                                    <p>フォロワー</p>
                                    <p>フォロー</p>
                                </div>
                                <div className="col-sm-8 text-left">
                                    <p>210,000</p>
                                    <p>10,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="msg text-center">
                        私はバイクが大好きで、関東近辺でよく走っています！<br />
                        近場で走っている人がいたら、是非声をかけてください！<br />
                        ツーリングはいつでも参加します！<br />
                        <button className="text-center round-btn-more">続きを読む</button>
                    </div>
                    <div className="btnBox">
                        <div className="row">
                            <div className="col-sm-4">
                                <button className="round-btn">プロフィール編集</button>
                            </div>
                            <div className="col-sm-4">
                                <button className="round-btn">ロードサービス</button>
                            </div>
                            <div className="col-sm-4">
                                <button className="round-btn"><p>運営者へ</p><p>お問い合わせ</p></button>
                            </div>
                        </div>

                        <div className="estimate-1">
                            {/* <a href="/account/request/new/type/"><button className="round-btn bg-black my-1">一斉見積もり</button>
                                    <img src="/storage/base/Group 95.png" alt="Group 95.png" className="question"/></a> */}
                            <Link to="/account/request/new/type/"><button className="round-btn bg-black my-1">一斉見積もり</button>
                                <img src="/storage/base/Group 95.png" alt="Group 95.png" className="question" /></Link>
                        </div>

                    </div>
                </div>
                <div className='imgBox'>
                    <div className="row">
                        <div className='col-sm-4'>
                            <div className="img-wrapper">
                                <img src="/storage/base/pexels-mansoor-980382.png" alt="pexels-mansoor-980382.png" />
                                <img src="/storage/base/Group 1.png" alt="Group 93.png" className="hint-1" />
                                <img src="/storage/base/Group 2.png" alt="Group 94.png" className="hint-2" />
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className="img-wrapper">
                                <img src="/storage/base/pexels-manu-js-1049872.png" alt="pexels-manu-js-1049872.png" />
                                <img src="/storage/base/Group 2.png" alt="Group 94.png" className="hint-1" />
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <img src="/storage/base/pexels-soumya-ranjan-994156.png" alt="pexels-soumya-ranjan-994156.png" />
                        </div>
                        <div className='col-sm-4'>
                            <img src="/storage/base/taras-chernus-Algo40PI79M-unsplash.png" alt="taras-chernus-Algo40PI79M-unsplash.png" />
                        </div>
                        <div className='col-sm-4'>
                            <div className="img-wrapper">
                                <img src="/storage/base/2291506_m.png" alt="2291506_m.png" />
                                <img src="/storage/base/Group 1.png" alt="Group 1.png" className="hint-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GlobalNav /></>
        
        );
    
    }
    
    