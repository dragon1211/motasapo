import React from 'react';
import './new.css'
import {TopNarBar} from '../topnavbar';

export const New=()=>{
    return(
        <div>
            <TopNarBar title="LOGO"/>
            <div className="new-body">
                <form action="">
                    <div className="p-20">
                        <label className="form-label" >画像（最大10枚）</label>
                        <button className="addPic-btn">写真を選択<span style={{float:'right'}}><img src="/storage/base/Group 93.png" alt="" /></span></button>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="time">終了時刻</label>
                        <div className="row">
                            <div className="col-sm-6">
                                <select className="form-control" name="time" id="time">
                                    <option value="1">1時間後</option>
                                    <option value="2">2時間後</option>
                                    <option value="3">3時間後</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="msg-input">本文（最大1000文字）</label>
                        <textarea className="form-control" id="msg-input" rows = {7} name="msg"/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="tag-input">タグ（最大5つ）</label>
                        <textarea className="form-control" id="tag-input" name="tags" placeholder="タグ（最大5つ）" />
                    </div>
                    <div className="p-20">
                        <button className="collect-btn">募集する</button>
                    </div>
                </form>
            </div>
        </div>
      );
}