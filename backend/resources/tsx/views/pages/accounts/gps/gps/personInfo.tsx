import * as React from 'react';
import { Link } from 'react-router-dom';
import './personInfo.css';

export interface PersonData {
    id: number;
    position: any;
    name: string;
    distance: number;
    finished: string;
    started: string;
    type: string;
    pic: string;
    msgbox: Array<string>;
}

type Props = {
    data: PersonData,
}

export const PersonInfo : React.FC<Props> = (props) => {
    const {name, distance, finished, started, type, pic, msgbox, id} = props.data;
    return (
        <div className='personInfo'>
            <div className='info-bar'>
                <div className="avatar-wrapper">
                    <Link to={`/account/gps/detail`}><img src={pic}  className="avatar" alt={`/storage/base/${pic}`}/></Link>
                </div>
                <div className='info'>
                    { type==="shop" && <img  src="/storage/base/icon-shop.png" className="pic-shop"/> }
                    <p className="name"><span>{ name }</span> <span className="name right">{`開始時間　${started}`}</span></p>
                    <p className="handle"><span>{ `${distance}m` }</span> <span className="name right">{`終了時間　${finished}`}</span></p>        
                </div>
            </div>
            <div className="msgBox">
                {   msgbox.map( (msg, idx) =><div className="msg" key={idx}>{msg}</div> )   }                                             
            </div>
        </div>
    );
}