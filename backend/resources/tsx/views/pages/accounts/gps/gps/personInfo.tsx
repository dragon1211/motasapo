import * as React from 'react';
import { Link } from 'react-router-dom';
import './personInfo.css';

export interface PersonData {
    account_id: number;
    name: string;
    avatar: string;
    location: any;
    distance: number;
    post_id: number;
    post_text: string;
    started: string;
    finished: string;
    account_type: string;
    sex: string;
    is_current_user: boolean;
}

type Props = {
    data: PersonData,
}

export const PersonInfo : React.FC<Props> = (props) => {
    const {name, distance, finished, started, sex, avatar, account_type, post_text, post_id, account_id} = props.data;
    return (
        <div className='personInfo'>
            <div className='info-bar'>
                <div className="avatar-wrapper">
                    {
                       <a href={`/account/gps/detail/${post_id}`}><img src={avatar}  className="avatar" alt={avatar}/></a>
                    }
                </div>
                <div className='info'>
                    { account_type==="shop" && <img  src="/storage/base/icon-shop.png" className="pic-shop"/> }
                    <p className="name"><span>{ name }</span> <span className="name right">{`開始時間　${started}`}</span></p>
                    <p className="handle"><span>{ `${distance}m` }</span> <span className="name right">{`終了時間　${finished}`}</span></p>        
                </div>
            </div>
            <div className="msgBox">
                <div className="msg">
                    <pre className="pre">{post_text}</pre>
                </div>                                      
            </div>
        </div>
    );
}