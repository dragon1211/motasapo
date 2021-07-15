import { useState, useCallback, useRef, useEffect } from "react";
import TextInput from "../components/UIkit/TextInput";
import PrimaryButton from "../components/UIkit/PrimaryButton";
import DisplayMessage from "./DisplayMessage";
import { makeStyles } from '@material-ui/core/styles';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import SendIcon from '@material-ui/icons/Send';
import { Avatar, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
    input: {
        display: 'flex',
        bottom: 0,
        width: '100%',
        zIndex: 9999,
        backgroundColor: 'white',
        position: 'fixed',
    },
    avatar: {
        marginTop: 20,
        marginRight: 5,
        marginLeft: 8
    },
    image: {
        display: "none"
    },
    label: {
        position: 'absolute',
        top: 10
    },
    file: {
        width: "35%",
        padding: "0.5em 1em",
        margin: "2em 0",
        fontWeight: "bold",
        border: 'solid 3px #000000',
    },
    div: {
        position: 'fixed',
        bottom: 45,
        left: 10,
        zIndex: 9999
    },
    iconButton: {
        position: 'relative',
        top: 0
    },
    right: {
        float: 'right',
        marginRight: 10,
        color: 'gray'
    }
});

const ChatMessages = () => {
    const messagesEndRef = useRef(null)
    const classes = useStyles();
    const [message, setMessage] = useState('')
    const [lists, setLists] = useState([])
    const [fileURL, setFileURL] = useState(null)
    const [mesImage, setMesImage] = useState(null)
    const [yourState, setYourState] = useState(null);
    const [mySelf, setMyself] = useState();

    const history = useHistory();
    const path = history.location.pathname;
    const route = path.split('/chat/')[1];
    const id = route.split('/');
    const a = path.split('/chat/')[0]
    const uid = a.split('/')


    const sendMessage = useCallback( (e) => {
        setMessage(e.target.value)
    }, [])

    const processImage = useCallback( (e) => {
        // 送信用の画像
        const imageParam = e.target.files[0]
        setMesImage(imageParam)

        // 表示用の画像
        const imageFile = e.target.files[0]
        const imageUrl = URL.createObjectURL(imageFile)
        setFileURL(imageUrl)
    }, [])

    const displayUnRead = () => {
        if(lists.length !== 0){
            const is_myself = lists[lists.length - 1]
            const unRead = lists.filter(list => list.send_account_id == uid[2] && list.is_read == 0)
            if(is_myself.send_account_id == uid[2] && unRead.length != 0){
                return(
                    <div style={{ height: 30, }}>
                        <p className={classes.right}>未読</p>
                    </div>
                )
            }else if(is_myself.send_account_id == uid[2] && unRead == 0){
                return(
                    <div style={{ height: 27, }}>
                        <p className={classes.right}>既読</p>
                    </div>
                )
            }
        }else{
            return(
                <></>
            )
        }
    }

    const pushSubmitButton = async () => {
        if(fileURL){
            const data = new FormData();
            data.append('send_account_id', Number(uid[2]))
            data.append('receive_account_id', Number(id[1]))
            data.append('room_id', Number(id[0]))
            data.append('is_read', 0)
            data.append('image', mesImage)

            await axios.post('/account/chat/sendImage', data, {headers:{"Content-Type": 'multipart/form-data'}})
                .then( res => {
                    const result = res.data
                    setLists( (prevLists) => [...prevLists, result] )
                    scrollToBottom1()
                })
            setTimeout(() => {
                setFileURL(null)
            }, 100);
        }
        else if(message != ''){
            // Laravelに送る
            const data = JSON.stringify({
                send_account_id: Number(uid[2]),
                receive_account_id: Number(id[1]),
                room_id: Number(id[0]),
                is_read: false,
                text: message
            })
            await axios.post('/account/chat/sendMessage', data, {headers:{"Content-Type": "application/json"}})
                .then( res => {
                    const result = res.data
                    setLists( (prevLists) => [...prevLists, result] )
                    scrollToBottom1()
                    setTimeout(() => {
                        setMessage('')
                    }, 100);
                })
        }
    }

    useEffect( async () => {
        // チャットルーム取得
        await axios.get(`/account/chat/${id[0]}/${uid[2]}`)
        .then( res => {
            setLists(res.data)
        })

        // メッセ相手のUser情報（Reduxなどから持ってくるのが理想）
        await axios.get(`/account/user/${id[1]}`)
            .then( res => {
                setYourState(res.data)
            })

        await axios.get(`/account/myself/${uid[2]}`)
            .then(res => {
                setMyself(res.data)
                scrollToBottom()
            })
    }, [])

    //一番下まで移動する。
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "start" })
    }

    const scrollToBottom1 = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: "start" })
    }

    return(
        <>
            {
                lists && yourState
                    ?
                    <>
                        <DisplayMessage items={lists} tag={displayUnRead()} user={yourState} />
                    </>
                    :
                    <></>
            }
            <div ref={messagesEndRef} />
            {
                !fileURL
                    ?
                <></>
                    :
                <div className={classes.div}>
                    <img className={classes.file} src={fileURL} />
                    <IconButton className={classes.iconButton} size="small" onClick={ () => setFileURL(null)}>
                        <ClearIcon />
                    </IconButton>
                </div>
            }

            <div className={classes.input}>
                {
                    mySelf && mySelf.img
                        ?
                        <Avatar className={classes.avatar} src={`${mySelf.img}`} />
                        :
                        mySelf
                            ?
                            <Avatar className={classes.avatar}>{mySelf.name}</Avatar>
                            :
                            <Avatar className={classes.avatar}></Avatar>
                }
                <TextInput
                    fullWidth={true}
                    label={"メッセージを入力してください。"}
                    multiline={false}
                    required={true}
                    rows={1}
                    value={message}
                    type={"text"}
                    onChange={sendMessage}
                />
                {
                    message.length > 0 || fileURL
                        ?
                    <PrimaryButton
                        className="classes.button"
                        onClick={ () => pushSubmitButton() }
                        icon={<SendIcon />}
                        bool={<></>}
                    />
                        :
                    <PrimaryButton
                        className="classes.button"
                        onClick={ () => pushSubmitButton() }
                        icon={<PhotoSizeSelectActualIcon /> }
                        bool={<input
                            className={classes.image}
                            id="icon-button-file"
                            multiple
                            type="file"
                            accept="image/*,.png,.jpg,.jpeg,.gif"
                            onChange={processImage}
                          />}
                    />

                }
            </div>
        </>
    )
}

export default ChatMessages