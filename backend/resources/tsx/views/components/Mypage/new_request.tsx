import React from 'react';
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import axios from 'axios';

interface request_data{

    budget?:any,
    area?:any,
    Remarks?:any

}

interface State{
    request: request_data
}

export class New_request extends React.Component <request_data,State>{

    constructor(props:any){
        super(props);
        this.state = {
            request: {budget:'' ,area:'お住まいの地域1',Remarks:''}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e:any)=>{

        var val = e.target.value;   
        var key = e.target.id;
        var cur_request = this.state.request;
        switch(key){
            case '1' : cur_request.budget = val; break;
            case '2' :cur_request.area = val; break;
            case '3' : cur_request.Remarks = val; break;
        }
        this.setState({
            request:cur_request
        });
    }
     handleSubmit = (e:any) =>{
        
        localStorage.setItem("request",JSON.stringify({"request":this.state.request}));
        let wishs = localStorage.getItem("wish");
        let vehicle = localStorage.getItem("vehicle");
        let images = localStorage.getItem("Images");
        let detail = localStorage.getItem("detail");
        let request = localStorage.getItem("request");
        localStorage.clear();

        if (typeof wishs === 'string') {
            wishs = JSON.parse(wishs);
            console.log(wishs);
        }
        if(typeof vehicle === 'string'){
            vehicle = JSON.parse(vehicle);
            console.log(vehicle);
        }
        if(typeof images === 'string'){
            images = JSON.parse(images);
            console.log(images);
        }
        if(typeof detail === 'string'){
            detail = JSON.parse(detail);
            console.log(detail);
        }
        if(typeof request === 'string'){
            request = JSON.parse(request);
            console.log(request);
        }
        
        // e.preventDefault();
        const data  = new FormData()
        if(typeof wishs === 'string'){
            data.append("wishs", wishs)
        }
        if(typeof vehicle === 'string'){
            data.append("vehicle", vehicle)
        }
        if(typeof images === 'string'){
            data.append("images", images)
        }
        if(typeof detail === 'string'){
            data.append("detail", detail)
        }
        if(typeof request === 'string'){
            data.append("request", request)
        }

       axios({
        method: "post",
        url: "/account/request/new/complete",
        data: data,
        headers: { "Content-Type": "multipart/form-data"}
       }).then((res:any)=>{
            console.log(res);
            window.location.assign("/account/request/new/complete");
            
       }).catch((error:any)=>{

       });       
 
        
    }  
    
    

    render(){ 
        return (
            <div>
                <div className="info">
                    <h2 className="text-2">希望を入力してください</h2> 
                    
                    <div className="form">
                        <input type="text" className="form-text" onChange={this.handleChange} placeholder="予算" id="1">
                        </input>
                        <div className="select">
                            <select className="form-text" onChange={this.handleChange} placeholder="お住まいの地域" id="2">
                                <option value="お住まいの地域1" placeholder="お住まいの地域">お住まいの地域1</option>
                                <option value="お住まいの地域2" placeholder="お住まいの地域">お住まいの地域2</option>
                                <option value="お住まいの地域3" placeholder="お住まいの地域">お住まいの地域3</option>
                                <option value="お住まいの地域4" placeholder="お住まいの地域">お住まいの地域4</option>
                            </select>
                        </div>
                        
                        <textarea  className="form-text" onChange={this.handleChange} placeholder="備考" id="3">
                        </textarea>
                    </div>
                    
                    <div className="estimate1">
                        {/* <a href="/account/request/new/complete"><button className="round-btn bg-black my-1">一斉見積もりを送信</button></a>     */}
                        <button onClick={this.handleSubmit} className="round-btn bg-black my-1">一斉見積もりを送信</button>   
                    </div>
                    
                </div>
            </div>
        );
}
}

