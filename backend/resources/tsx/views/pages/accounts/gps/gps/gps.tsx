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
    filter_data: Array<PersonData>;
    latitude?:number;
    longitude?:number;
    isLoading?: boolean
    isGetCurPos?: boolean
}

export class GPS extends Component<{}, State> {
    test_data:any;
    intervalID = setInterval(()=>this.getData(), 60000); // Will alert every minute.

    constructor(Props: any){
        super(Props);
        this.getData();
        this.state = {
            filter_data: [],
            latitude: 0,
            longitude: 0,
            isLoading: false
        };
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getData = async () =>{
        await navigator.geolocation.getCurrentPosition(position => {
            this.setState(
            {
                latitude: position.coords.latitude,
                longitude:  position.coords.longitude
            });
            var curPos = { lat: this.state.latitude, lng: this.state.longitude };
            axios.post('/account/gps/api', curPos)
            .then(response=>{
                 this.test_data = (response.data); 
                 this.setState({
                     filter_data: [...this.test_data],
                     isLoading: true
                 })
            })
        });
    }

    selectAll(){
        var items = [];
        for(var i=0; i < this.test_data.length; i++) items.push(this.test_data[i]);
        this.setState({ filter_data: [...items] })
    }

    selectShop(){
        var items = [];
        for(var i=0; i < this.test_data.length; i++)
            if(this.test_data[i].type == "shop") items.push(this.test_data[i]);
        this.setState({ filter_data: [...items] })
    }

    selectFemale(){
        var items = [];
        for(var i=0; i < this.test_data.length; i++)
            if(this.test_data[i].type == "female") items.push(this.test_data[i]);  
        this.setState({ filter_data: [...items] })
    }

    selectMale(){
        var items = [];
        for(var i=0; i<this.test_data.length; i++)
            if(this.test_data[i].type == "male")  items.push(this.test_data[i]);
        this.setState({ filter_data: [...items]})
    }

    selectUser(){
        var items = [];
        for(var i=0; i < this.test_data.length; i++)
            if(this.test_data[i].type == "user")           
                items.push(this.test_data[i]);
        this.setState({ filter_data: [...items]})
    }

    render(){
        return (
            <div>
                <TopNarBar title="GPS"/>
                {
                    this.state.isLoading ? 
                    (<div className="gps-body">
                        <div className="map-size">
                        <Map markers={this.test_data}/>
                        </div>
                        <div className="wrap-info">
                            <div className="row f">
                                <div className="col-sm-4 my-1">
                                    <button className="round-btn"  onClick={e=>this.selectAll()} autoFocus>全て</button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button className="round-btn"  onClick={e=>this.selectShop()}>ショップのみ</button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button className="round-btn"  onClick={e=>this.selectUser()}>ユーザー</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 my-1">
                                    <button className="round-btn"  onClick={e=>this.selectMale()}>ユーザー：男性のみ</button>
                                </div>
                                <div className="col-sm-6 my-1">
                                    <button className="round-btn"  onClick={e=>this.selectFemale()}>ユーザー：女性のみ</button>
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
                                    <Link to="/account/gps/new" className="l-nav--link-gps">
                                        <span>募集する</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>) : null
                }
            </div>    
        );
    }
}