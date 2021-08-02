import React, {Component, useEffect} from 'react';
import {PersonInfo, PersonData} from './personInfo';
// import {test_data} from './test';
import {Map} from './map';
import axios from "axios";
import {TopNarBar} from '../topnavbar';
import './gps.css';
import './loader.css';
import { Link } from 'react-router-dom';
import {Grid, Button} from '@material-ui/core'

type State={
    total_data: Array<PersonData>
    filter_data: Array<PersonData>
    latitude?:number
    longitude?:number
    isLoading?: boolean
    isGetCurPos?: boolean
    isSelected: String
}
export class GPS extends Component<{}, State> {

    intervalID = setInterval(()=>this.getData(), 60000); // Will alert every minute.

    constructor(Props: any){
        super(Props);  
        var state = window.localStorage.getItem('state');
        if(state != null){
            this.state = {
                total_data: [...JSON.parse(state).total_data],
                filter_data: [...JSON.parse(state).total_data],
                latitude: JSON.parse(state).latitude,
                longitude: JSON.parse(state).longitude,
                isLoading: JSON.parse(state).isLoading,
                isSelected: 'all'
            };
        } 
        else{
            this.state = {
                total_data: [],
                filter_data: [],
                latitude: 0,
                longitude: 0,
                isLoading: false,
                isSelected: 'all'
            };
            this.getData();
        } 
        this.saveLocalStorages = this.saveLocalStorages.bind(this)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
        this.saveLocalStorages()
    }

    getData =  () =>{
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
                     isLoading: true
                 })
            })
        });
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

    saveLocalStorages(){
        window.localStorage.clear();
        window.localStorage.setItem('state',JSON.stringify(this.state));
    }

    render(){
        return (
            <div>
                <TopNarBar title="GPS"/>
                {
                    this.state.isLoading ? 
                    (<div className="gps-body">
                        <div className="map-size">
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
                                this.state.filter_data.map( (item:any, id:any) =><PersonInfo data = {item} key={id}/> )                                                      
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
                                    <a onClick={this.saveLocalStorages} className="l-nav--link-gps">
                                        募集する
                                    </a>
                                </Grid>
                            </Grid>
                        </div>
                    </div>) : null
                }
            </div>    
        );
    }
}