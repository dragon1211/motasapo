import * as React from 'react';
import './personInfo.css';

export interface PersonData {
    name: string;
    distance: number;
    finished: string;
    started: string;
    isShop: boolean;
    pic: string;
    msgbox: Array<string>;
}

type Props = {
    data: PersonData
}

export const PersonInfo : React.FC<Props> = (props) => {
    const {name, distance, finished, started, isShop, pic, msgbox} = props.data;
    return (
        <div className='personInfo'>

            <img src={`/storage/base/${pic}`} className="avatar" alt={`/storage/base/${pic}`} />

            <div className='info'>
                { isShop && <img  src="/storage/base/icon-shop.png" className="pic-shop"/> }
                <p className="name"><span>{ name }</span> <span className="name right">{`終了時間　${finished}`}</span></p>
                <p className="handle"><span>{ `${distance}m` }</span> <span className="name right">{`開始時間　${started}`}</span></p>        
            </div>
            
            {   msgbox.map( msg =><div className="msg">{msg}</div> )   }                                             
        </div>
    );
}