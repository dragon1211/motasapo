import React, {Component, useEffect} from 'react';
import {PersonInfo, PersonData} from './personInfo';
// import {test_data} from './test';
import {Map} from './map';
import axios from "axios";
import {TopNarBar} from '../topnavbar';

import '../../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './gps.css';
import './loader.css';
import { Link } from 'react-router-dom';

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
        if(this.state.total_data.length == 0) return;
        window.localStorage.setItem('state',JSON.stringify(this.state));
    }

    render1(){
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
                            <div className="row f">
                                <div className="col-sm-4 my-1">
                                    {
                                        this.state.isSelected == 'all' ? <button className="round-btn selected"  onClick={e=>this.selectAll()}>全て</button>
                                        : <button className="round-btn"  onClick={e=>this.selectAll()}>全て</button>
                                    }
                                </div>
                                <div className="col-sm-4 my-1">
                                    {
                                        this.state.isSelected == 'shop' ?   <button className="round-btn selected"  onClick={e=>this.selectShop()}>ショップのみ</button>
                                        :  <button className="round-btn"  onClick={e=>this.selectShop()}>ショップのみ</button>
                                    }
                                </div>
                                <div className="col-sm-4 my-1">
                                    {
                                        this.state.isSelected == 'user' ?   <button className="round-btn selected"  onClick={e=>this.selectUser()}>ユーザー</button>
                                        :  <button className="round-btn"  onClick={e=>this.selectUser()}>ユーザー</button>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 my-1">
                                    {
                                        this.state.isSelected == 'male' ? <button className="round-btn selected"  onClick={e=>this.selectMale()}>ユーザー：男性のみ</button>
                                        :  <button className="round-btn"  onClick={e=>this.selectMale()}>ユーザー：男性のみ</button>
                                    }
                                </div>
                                <div className="col-sm-6 my-1">
                                    {
                                        this.state.isSelected == 'female' ? <button className="round-btn selected"  onClick={e=>this.selectFemale()}>ユーザー：女性のみ</button>
                                        : <button className="round-btn"  onClick={e=>this.selectFemale()}>ユーザー：女性のみ</button>
                                    }
                                </div>
                            </div>
                            {
                                this.state.filter_data.map( (item:any, id:any) =><PersonInfo data = {item} key={id}/> )                                                      
                            }
                        </div>

                        <div className="l-nav gps">
                            <div className="l-nav--items c-flex v-center">
                                <div className="l-nav--item is-selected">
                                    <a href="" className="l-nav--link-gps">
                                        <span>G P S</span>
                                    </a>
                                </div>
                                <div className="l-nav--item">
                                    <div className="l-nav--link-gps">
                                        <button onClick={this.saveLocalStorages}>募集する</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>) : null
                }
            </div>    
        );
    }

    render(){
        return (
            <div>
                <TopNarBar title="GPS"/>
                {
                   <div className="gps-body">
                        
                        <div className="map-size">
                        {
                            this.state.isLoading? <Map markers={this.state.total_data}/>
                            :  <div className="dummy-item-map"/>
                        }
                        </div>
                        <div className="wrap-info">
                            <div className="row f">
                                <div className="col-sm-4 my-1">
                                    {
                                        this.state.isSelected == 'all' ? <button className="round-btn selected"  onClick={e=>this.selectAll()}>全て</button>
                                        : <button className="round-btn"  onClick={e=>this.selectAll()}>全て</button>
                                    }
                                </div>
                                <div className="col-sm-4 my-1">
                                    {
                                        this.state.isSelected == 'shop' ?   <button className="round-btn selected"  onClick={e=>this.selectShop()}>ショップのみ</button>
                                        :  <button className="round-btn"  onClick={e=>this.selectShop()}>ショップのみ</button>
                                    }
                                </div>
                                <div className="col-sm-4 my-1">
                                    {
                                        this.state.isSelected == 'user' ?   <button className="round-btn selected"  onClick={e=>this.selectUser()}>ユーザー</button>
                                        :  <button className="round-btn"  onClick={e=>this.selectUser()}>ユーザー</button>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 my-1">
                                    {
                                        this.state.isSelected == 'male' ? <button className="round-btn selected"  onClick={e=>this.selectMale()}>ユーザー：男性のみ</button>
                                        :  <button className="round-btn"  onClick={e=>this.selectMale()}>ユーザー：男性のみ</button>
                                    }
                                </div>
                                <div className="col-sm-6 my-1">
                                    {
                                        this.state.isSelected == 'female' ? <button className="round-btn selected"  onClick={e=>this.selectFemale()}>ユーザー：女性のみ</button>
                                        : <button className="round-btn"  onClick={e=>this.selectFemale()}>ユーザー：女性のみ</button>
                                    }
                                </div>
                            </div>
                            {
                                this.state.isLoading ? 
                                this.state.filter_data.map( (item:any, id:any) =><PersonInfo data = {item} key={id}/> )
                                : null                                                      
                            }
                        </div>

                        <div className="l-nav gps">
                            <div className="l-nav--items c-flex v-center">
                                <div className="l-nav--item is-selected">
                                    <a href="" className="l-nav--link-gps">
                                        <span>G P S</span>
                                    </a>
                                </div>
                                <div className="l-nav--item">
                                    <div className="l-nav--link-gps">
                                        <button onClick={this.saveLocalStorages}>募集する</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>    
        );
    }
}