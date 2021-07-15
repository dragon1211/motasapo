import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';

const useStyles = makeStyles({
    body: {
        margin: '60px 20px 5px 20px'
    },
    detail: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    follow: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    logoImage: {
        borderRadius: "50%",
    },
    description: {
        position: 'relative',
    },
    descriptionGradient: {
        height: 40,
        background: "linear-gradient(to bottom, #ffffff00, #f7f9fc)",
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    shopDetail: {
        marginTop: 30,
        height: 50,
        overflow: 'hidden',
    },
    detailButton: {
        borderRadius: '33px',
        padding: "5px 30px",
        boxShadow: "0 0 3px 2px #ccc",
        position: 'absolute',
        bottom: "0",
        background: 'white',
        left: "50%",
        transform: "translate3D(-50%, 100%, 0)",
    },
    buttons: {
        marginTop: 45,
    },
    button: {
        display: 'block',
        width: '100%',
        border: '1px solid gray',
        borderRadius: '8px',
        textAlign: 'center',
        height: '38px',
        display: 'flex',
        alignItems: "center",
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    followButton: {
        border: "1px solid #188bff",
        color: "#188bff",
    },
    name: {
        marginBottom: '20px',
    },
    shopname: {
        fontSize: '15px',
        fontWeight: 'bold',
    },
    postContainer: {
        position:'relative',
    },
    postPending: {
        position: 'absolute',
        borderRadius: '20px',
        background: '#188bff',
        color:'white',
        top: '10px',
        right: '8px',
        padding: "2px 5px",
    }
});

const Profile = () => {
    let { id } = useParams();
    const classes = useStyles();
    const [shop, setShop] = useState({
        id: 0,
        tel: '',
        url: '',
        detail: '',
        addresss: '',
        mail: '',
        follower: 0,
        following: 0,
        posts: []
    });
    useEffect( () => {
        let data = {
            id: 1,
            tel: '+0000000000',
            url: '/storage/base/logo-square.png',
            detail: 'ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。',
            addresss: 'ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。',
            mail: 'aaa@aaa.com',
            follower: 210000,
            following: 10000,
            posts: [
                {
                    id: 1,
                    url: '/storage/base/logo-square.png',
                    type: 1,
                },
                {
                    id: 2,
                    url: '/storage/base/logo-square.png',
                    type: 1,
                },
                {
                    id: 3,
                    url: '/storage/base/logo-square.png',
                    type: 0,
                },
                {
                    id: 4,
                    url: '/storage/base/logo-square.png',
                    type: 0,
                },
                {
                    id: 5,
                    url: '/storage/base/logo-square.png',
                    type: 0,
                },
            ]
        }
        setShop(data);
    }, []);

    const readMore = (e) => {
        e.preventDefault();
        document.getElementById('shopDetail').style.height = 'auto';
        document.getElementById('detailGradient').style.display = 'none';
    }

    const follow = (e) => {
        e.preventDefault();
        let shop1 = shop;
        shop1.follower ++;
        setShop(shop1);
    }

    return (
        <div className={classes.body}>
            <Grid container justifyContent="space-around" alignItems="center" direction='row' spacing = {1}>
                <Grid item xs = {5}>
                    <img src={shop.url} alt={shop.id} className={classes.logoImage}/>
                </Grid>
                <Grid item xs = {6}>
                    <div className={classes.name}>
                        <p className={classes.shopname}>shop.miyama</p>
                        <small style={{color:'lightgray'}}>ここ</small>
                    </div>
                    <div className={classes.follow}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>フォロワー</Grid>
                            <Grid item xs={6}>{shop.follower}</Grid>
                            <Grid item xs={6}>フォロー</Grid>
                            <Grid item xs={6}>{shop.following}</Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.description}>
                <div className={classes.shopDetail} id="shopDetail">{shop.detail}</div>
                <div className={classes.descriptionGradient} id="detailGradient"></div>
                <Button className={classes.detailButton} onClick={readMore}><span>続きを読む</span></Button>
            </div>
            <div className={classes.buttons}>
                <Grid container spacing = {1}>
                    <Grid item xs = {6}>
                        <Button className={classes.button, classes.followButton} onClick={follow}>
                            <span>フォローする</span>
                        </Button>
                    </Grid>
                    <Grid item xs = {6}>
                        <Grid container spacing = {1} justifyContent="space-between">
                            <Grid item>
                                <a className={classes.button} href={`mailto:${shop.mail}`}><EmailOutlinedIcon /></a>
                            </Grid>
                            <Grid item>
                                <a className={classes.button} href={`tel:${shop.tel}`}><PhoneOutlinedIcon /></a>
                            </Grid>
                            <Grid item>
                                <a className={classes.button} onClick={() => {navigator.clipboard.writeText(shop.addresss)}}>MAP</a>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {12}>
                        <Button className={classes.button}>
                            <span>ショップに位置情報を送る</span>
                        </Button>
                    </Grid>
                </Grid>
                <Button><span></span></Button>
            </div>
            <div className={classes.post}>
                <Grid
                    container
                    direction = 'row'
                    alignItems="flex-start"
                    spacing = {1}
                >
                    {
                        shop.posts.map((post, index) => (
                            <Grid item xs = {4} key={index}>
                                <div className={classes.postContainer}>
                                    <a href="#">
                                        <img src={post.url} alt="postImage" className={classes.postImage} />
                                    </a>
                                    {
                                        (post.type == 1) ?
                                        <div className={classes.postPending}>募集中</div>
                                        : null
                                    }
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    );
}

export default Profile;
