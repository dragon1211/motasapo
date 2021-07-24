import React from 'react';
import {TopNarBar} from '../topnavbar';
import './detail.css';

const perInfo = {
    name: 'Michel',
    describe: 'ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。',
    time: 3,
    number: 132,
    pic: 'sample-human1.png'
}

export const Detail=()=>{
    return(
    <div>
        <TopNarBar title="LOGO"/>    
        <div className="detail-body">
            <div style={{padding:'20px 0 0'}}>
                <img className="avatar" src={`/storage/base/${perInfo.pic}`} alt={perInfo.pic}/>
                <p className="name">{perInfo.name}</p>
            </div>
            <div style={{padding:'20px 0'}}>
                <img className="detail-pic" src="/storage/base/2291506_m.png" alt="2291506_m.png" />
            </div>
            <div >
                <img className="avatar" src="/storage/base/icon_eye_p.png" alt="icon_eye_p.png"/>
                <p style={{paddingTop:'10px'}}>{perInfo.number}<span style={{float:'right', color:'#8899a6'}}>{`${perInfo.time}時間前`}</span></p>
            </div>
            <div style={{paddingBottom: '20px', margin: '20px 0'}}>
                <p >ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。</p>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <button className="round-btn">プロフィールを見る</button>
                </div>
                <div className="col-sm-6">
                    <button className="round-btn">メッセージを送る</button>
                </div>
            </div>
        </div>
    </div>
    );
}