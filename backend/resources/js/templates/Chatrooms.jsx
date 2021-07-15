import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import formatDistance from 'date-fns/formatDistance'
import { ja } from 'date-fns/locale'

const useStyles = makeStyles({
    body: {
        display: 'flex',
        marginLeft: 30,
        marginBottom: 5,
        marginTop: 5
    },
    text: {
        lineHeight: 'normal',
        color: '#000'
    },
    box: {
        marginLeft: 10,
    },
    div: {
        position: 'relative',
        top: 45,
    }
});

// 自分のIDと比較して違うIDをroom.user2に設定する
const Chatrooms = () => {
    const classes = useStyles();
    const [rooms, setRooms] = useState([])
    const [id, setId] = useState(0)

    const nowDate = new Date()
    const str = '新着メッセージ'

    useEffect( async () => {
        // ルームを取得
        await axios.get(`/account/id`)
            .then( res => {
                setId(res.data)
            })

        await axios.get(`/account/chatroom/page`)
            .then( res => {
                setRooms(res.data)
            })
    }, [])


    if(rooms.length == 0){
        return(
            <p style={{marginTop: 50}}>読み込み中</p>
        )
    }else{
        return(
            <div className={classes.div}>
            {
                rooms.map( room => {
                    const date = new Date(room.last_login_at)
                    const ago = formatDistance(nowDate, date, { locale: ja })
                    const user = room.user1 == id ? room.user2 : room.user1
                    return(
                        <Link className="l-main wrap" to={`/account/${id}/chat/${room.id}/${user}`} key={room.id}>
                            <div className={classes.body}>
                                {
                                    room.img
                                        ?
                                        <Avatar src={`${room.img}`} />
                                        :
                                        <Avatar>{room.name}</Avatar>
                                }
                                <div className={classes.box}>
                                    <p className={classes.text}>
                                        {room.name}<br/>
                                        {
                                            room.is_read == 0 && room.receive_account_id == id[0]
                                                ?
                                                <span>{str}</span>
                                                :
                                                <span style={{ color: '#C0C0C0' }}>{`${ago}前にオンライン`}</span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
            </div>
        )
    }
}

export default Chatrooms