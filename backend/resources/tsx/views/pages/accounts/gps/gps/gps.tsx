import React, {Component, useEffect} from 'react';
import {PersonInfo, PersonData} from './personInfo';
// import {test_data} from './test';
import {Map} from './map';
import axios from "axios";
import {Header} from '../../../../layout/Header';
import './gps.css';
import './loader.css';
import { Link } from 'react-router-dom';
import {Grid, Button} from '@material-ui/core'

type State={
    total_data: Array<PersonData>
    filter_data: Array<PersonData>
    latitude?:number
    longitude?:number
    status?: string
    isGetCurPos?: boolean
    isSelected: String
    map_width?: number
    map_height?: number
}
export class GPS extends Component<{}, State> {
    _isMounted = false;
    intervalID = setInterval(()=>this.getData(), 60000); // Will alert every minute.

    constructor(Props: any){
        super(Props);  
        this.state = {
            total_data: [],
            filter_data: [],
            latitude: 0,
            longitude: 0,
            status: '',
            isSelected: 'all',
            map_width: 0,
            map_height: 0,
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.intervalID);
        window.removeEventListener('resize', this.handleResize);
    }

    componentDidMount  = () => {
        this._isMounted = true;
        this.getData();
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }


    getData =  () =>{
        if(this._isMounted){
            navigator.geolocation.getCurrentPosition(position => {
                this.setState(
                {
                    latitude: position.coords.latitude,
                    longitude:  position.coords.longitude
                });
                var curPos = { lat: this.state.latitude, lng: this.state.longitude };
                axios.post('/account/gps/api', curPos)
                .then(response=>{
                    var res = (response.data); 
                    this.setState({
                        total_data : [...res],
                        filter_data: [...res],
                        status: 'loaded'
                    })
                }).catch(err=>{
                    this.setState({status: 'failed'});
                })
            });
        }
    }

    selectAll(){
        var items = [];
        for(var i=0; i < this.state.total_data.length; i++) items.push(this.state.total_data[i]);
        this.setState({ filter_data: [...items], isSelected : 'all' })
    }

    selectShop(){
        var items = [];
        for(var i=0; i < this.state.total_data.length; i++)
            if(this.state.total_data[i].type == "shop") items.push(this.state.total_data[i]);
        this.setState({ filter_data: [...items], isSelected : 'shop' })
    }

    selectFemale(){
        var items = [];
        for(var i=0; i < this.state.total_data.length; i++)
            if(this.state.total_data[i].type == "female") items.push(this.state.total_data[i]);  
        this.setState({ filter_data: [...items], isSelected : 'female' })
    }

    selectMale(){
        var items = [];
        for(var i=0; i<this.state.total_data.length; i++)
            if(this.state.total_data[i].type == "male")  items.push(this.state.total_data[i]);
        this.setState({ filter_data: [...items], isSelected : 'male' })
    }

    selectUser(){
        var items = [];
        for(var i=0; i < this.state.total_data.length; i++)
            if(this.state.total_data[i].type == "user")           
                items.push(this.state.total_data[i]);
            this.setState({ filter_data: [...items], isSelected : 'user' })
    }

    handleResize = () => {
        var w = document.getElementById('gps')?.clientWidth;
        var h;
        if(w) h = w;
        this.setState({map_width: w, map_height: h})
    }

    render(){
        return (
            <div>
                <Header title="GPS"/>
                    <div className="gps-body">
                        <div style={{width:`${this.state.map_width}`, height: `${this.state.map_height}`}}>
                            <Map markers={this.state.total_data}/>
                        </div>
                        <div className="wrap-info">
                            <Grid container spacing={1} alignItems={'center'} justifyContent={'center'}>
                                <Grid container item sm={12} spacing={1} >
                                    <Grid item sm={4} xs={12}>
                                        {
                                            this.state.isSelected == 'all' ? <Button className="round-btn selected"  onClick={e=>this.selectAll()}>全て</Button>
                                            : <Button className="round-btn"  onClick={e=>this.selectAll()}>全て</Button>
                                        }
                                    </Grid>
                                    <Grid item sm={4} xs={12} >
                                        {
                                            this.state.isSelected == 'shop' ?   <Button className="round-btn selected"  onClick={e=>this.selectShop()}>ショップのみ</Button>
                                            :  <Button className="round-btn"  onClick={e=>this.selectShop()}>ショップのみ</Button>
                                        }
                                    </Grid>
                                    <Grid item sm={4} xs={12} >
                                        {
                                            this.state.isSelected == 'user' ?   <Button className="round-btn selected"  onClick={e=>this.selectUser()}>ユーザー</Button>
                                            :  <Button className="round-btn"  onClick={e=>this.selectUser()}>ユーザー</Button>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid container item sm={12} spacing={1}>
                                    <Grid item sm={6} xs={12}>
                                        {
                                            this.state.isSelected == 'male' ? <Button className="round-btn selected"  onClick={e=>this.selectMale()}>ユーザー：男性のみ</Button>
                                            :  <Button className="round-btn"  onClick={e=>this.selectMale()}>ユーザー：男性のみ</Button>
                                        }
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        {
                                            this.state.isSelected == 'female' ? <Button className="round-btn selected"  onClick={e=>this.selectFemale()}>ユーザー：女性のみ</Button>
                                            : <Button className="round-btn"  onClick={e=>this.selectFemale()}>ユーザー：女性のみ</Button>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            {
                                this.state.status == 'loaded' ? 
                                    this.state.filter_data.map( (item:any, id:any) =><PersonInfo data = {item} key={id}/> )  
                                :  <div className="gps-body"><div className="u-align__center">データが存在していません。</div></div>                                                  
                            }
                        </div>

                        <div className="l-nav gps">
                            <Grid container item>
                                <Grid item sm={6} xs={6} className="l-nav--item is-selected">
                                    <a href="" className="l-nav--link-gps">
                                        <span>G P S</span>
                                    </a>
                                </Grid>
                                <Grid item sm={6} xs={6} className="l-nav--item">
                                    <a className="l-nav--link-gps">
                                        募集する
                                    </a>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
            </div>    
        );
    }
}