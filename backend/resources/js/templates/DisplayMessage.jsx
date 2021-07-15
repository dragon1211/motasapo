import React from 'react';
import { Avatar } from '@material-ui/core'
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { format } from 'date-fns';
import differenceInMinutes from 'date-fns/differenceInMinutes'

const useStyles = makeStyles( (theme) =>
    createStyles({
        root: {
            marginTop: 50,
            paddingBottom: 20,
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            marginBottom: 48,
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
        rightChips: {
            paddingTop: 7,
            paddingBottom: 7

        },
        leftChips: {
            paddingTop: 7,
            paddingBottom: 7
        },
        text: {
            border: "2px solid #eee",
            background: '#eee',
            borderRadius: "15px 15px 15px 0px",
            marginLeft: 5,
            marginTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 13,
            maxWidth: "80%",
        },
        text2: {
            border: "2px solid #eee",
            background: '#eee',
            borderRadius: "0px 15px 15px 0px",
            marginLeft: 5,
            marginTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 13,
            maxWidth: "80%",
        },
        box: {
            display: "flex",
        },
        box2: {
            float: 'right',
            maxWidth: "80%",
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 13,
            border: "2px solid #D9E5FF",
            background: '#D9E5FF',
            borderRadius: "15px 15px 0px 15px",
        },
        box3: {
            float: 'right',
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 13,
            border: "2px solid #D9E5FF",
            background: '#D9E5FF',
            borderRadius: "15px 0px 0px 15px",
            maxWidth: "80%",
        },
        imageBox: {
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 15,
            height: '100%'
        },
        img: {
            width: "70%",
            float: 'right',
        },
        imageBox2: {
            display: "flex",
            paddingRight: 10,
            fontSize: 15,
        },
        img2: {
            width: "70%",
            marginLeft: 10,
            marginTop: 5
        },
    }),
)

const DisplayMessage = (props) => {
    const history = useHistory();
    const path = history.location.pathname;
    const route = path.split('/chat/')[0]
    const uid = route.split('/')
    let count = 0;

    const classes = useStyles()
    console.log(props)
    return(
        <div className={classes.root}>
            {
                props.items && props.items.map( (item, i) => {
                    const date = format(new Date(item.created_at), 'yyyy年MM月dd日 HH:mm')
                    let prevState
                    let nextState
                    if(i != 0){
                        prevState = props.items[i-1]
                        nextState = props.items[i+1]
                        const subPrevMinutes = differenceInMinutes(new Date(item.created_at), new Date(prevState.created_at))
                        const subNextMinutes = nextState ? differenceInMinutes(new Date(nextState.created_at), new Date(item.created_at)) : 2
                        count = subPrevMinutes == 0 ? 1 : 0
                        return(
                            <div key={i}>
                                {
                                    count == 0
                                        ?
                                        <div style={{ textAlign: 'center', height: 25, fontSize: 12, color: 'gray' }}>
                                            <p>{date}</p>
                                        </div>
                                        :
                                        <></>
                                }
                                <div>
                                    {
                                        // 自分のメッセージ（2回目以降）
                                        item.send_account_id == uid[2]
                                            ?
                                            item.text
                                                ?
                                                prevState.send_account_id == item.send_account_id && prevState.text && count == 1
                                                    ?
                                                    <div className={classes.box3}>
                                                        <p className={classes.rightChips}>{item.text}</p>
                                                    </div>
                                                    :
                                                    <div className={classes.box2}>
                                                        <p className={classes.rightChips}>{item.text}</p>
                                                    </div>
                                                :
                                            <div className={classes.imageBox}>
                                                <a href={`http://127.0.0.1:8080/storage/message/${item.img}`}>
                                                    <img
                                                        className={classes.img}
                                                        src={`/storage/message/${item.img}`}
                                                    />
                                                </a>
                                            </div>
                                            :
                                            // 相手のメーセージ（2回目以降）
                                            item.text
                                                ?
                                                // prevState.send_account_id == item.send_account_id && prevState.text && count == 1 && (nextState || nextState.send_account_id == item.send_account_id)
                                                (nextState != undefined && nextState.send_account_id == item.send_account_id) && count == 0 && subNextMinutes == 0
                                                    ?
                                                    <div className={classes.box}>
                                                        <Avatar style={{ visibility: 'hidden' }}>N</Avatar>
                                                        <div className={classes.text}>
                                                            <p className={classes.leftChips}>{item.text}</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    prevState.send_account_id == item.send_account_id && prevState.text && count == 1 && (nextState && nextState.send_account_id == item.send_account_id)
                                                        ?
                                                        <div className={classes.box}>
                                                            <Avatar src={`${props.user.img}`}>N</Avatar>
                                                            <div className={classes.text2}>
                                                                <p className={classes.leftChips}>{item.text}</p>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className={classes.box}>
                                                            <Avatar src={`${props.user.img}`}>N</Avatar>
                                                            <div className={classes.text}>
                                                                <p className={classes.leftChips}>{item.text}</p>
                                                            </div>
                                                        </div>
                                                :
                                            <div className={classes.imageBox2}>
                                                <Avatar src={`${props.user.img}`}>N</Avatar>
                                                <a href={`http://127.0.0.1:8080/storage/message/${item.img}`}>
                                                    <img
                                                        className={classes.img2}
                                                        src={`/storage/message/${item.img}`}
                                                    />
                                                </a>
                                            </div>
                                    }
                                    <div className={"module-spacer--small"} />
                                </div>
                            </div>
                        )
                    }else{
                        return(
                            <div key={i}>
                                <div style={{ textAlign: 'center', height: 25, fontSize: 12, color: 'gray' }}>
                                    <p>{date}</p>
                                </div>
                                <div >
                                    {
                                        // 自分の初回メッセージ
                                        item.send_account_id == uid[2]
                                            ?
                                            item.text
                                                ?
                                            <div className={classes.box2}>
                                                <p className={classes.rightChips}>{item.text}</p>
                                            </div>
                                                :
                                            <div className={classes.imageBox}>
                                                <a href={`http://localhost/storage/message/${item.img}`}>
                                                    <img
                                                        className={classes.img}
                                                        src={`/storage/message/${item.img}`}
                                                    />
                                                </a>
                                            </div>
                                            // // 相手の初回メッセージ
                                            :
                                            item.text
                                                ?
                                            <div className={classes.box}>
                                                <Avatar src={`${props.user.img}`}>N</Avatar>
                                                <div className={classes.text}>
                                                    <p className={classes.leftChips}>{item.text}</p>
                                                </div>
                                            </div>
                                                :
                                            <div className={classes.imageBox2}>
                                                <Avatar src={`${props.user.img}`}>N</Avatar>
                                                <a href={`http://localhost/storage/message/${item.img}`}>
                                                    <img
                                                        className={classes.img2}
                                                        src={`/storage/message/${item.img}`}
                                                    />
                                                </a>
                                            </div>
                                    }
                                    <div className={"module-spacer--small"} />
                                </div>
                            </div>
                        )
                    }
                })
            }
            {props.tag}
        </div>
    )
}

export default DisplayMessage