import React from 'react';
// import  '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
    request: request_data,
    prefectures : any
    loadflag: boolean
}

export class New_request extends React.Component <request_data,State>{

    componentDidMount() {
        axios({
            method: "get",
            url: "/account/request/new/request_data"
           }).then((res:any)=>{   
                this.setState({
                    prefectures: [...res.data],
                    loadflag: true
                })

           }).catch((error:any)=>{
                console.log('err')
           }); 
      }

    constructor(props:any){
        super(props);
        this.state = {
            request: {budget:'' ,area:'北海道',Remarks:''},
            prefectures : [],
            loadflag : false
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
        // let images = localStorage.getItem("images");
        let detail = localStorage.getItem("detail");
        let request = localStorage.getItem("request");
        localStorage.clear();

        // if (typeof wishs === 'string') {
        //     wishs = JSON.parse(wishs).wish;
        //     console.log(wishs);
        // }
        // if(typeof vehicle === 'string'){
        //     vehicle = JSON.parse(vehicle).vehicle;
        //     // console.log(vehicle);
        // }
        // if(typeof images === 'string'){
        //     images = JSON.parse(images).images;
        //     // console.log(images);
        // }
        // if(typeof detail === 'string'){
        //     detail = JSON.parse(detail).detail;
        //     console.log(detail);
        // }
        // if(typeof request === 'string'){
        //     request = JSON.parse(request).request;
        //     // console.log(request);
        // }
        e.preventDefault();
        // const data  = new FormData()
        // // if(typeof wishs === 'string'){
        //     alert("dddd");
        const data = new FormData();
        //  data = {wishs: wishs, vehicle: vehicle, images: images, detail: detail, request: request};
        // console.log(form)
        //  data.append(form1)
        // // }
        if(typeof wishs === 'string'){
            data.append("wishs", wishs)
        }
        if(typeof vehicle === 'string'){
            data.append("vehicle", vehicle)
        }
        // if(typeof images === 'string'){
        //     data.append("images", images)
        // }
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
            // console.log(JSON.parse(res));
            console.log(res.data);
            window.location.assign("/account/mypage");
            
       }).catch((error:any)=>{
            console.log('err')
       });       
    }      

    render(){ 
        return (
            <div>
                <div className="info">
                    <h2 className="text-2">希望を入力してください</h2> 
                    {
                        this.state.loadflag ? 
                        <div className="form">
                            <input type="text" className="form-text" onChange={this.handleChange} placeholder="予算" id="1">
                            </input>
                            <div className="select">
                                <select className="form-text" onChange={this.handleChange} placeholder="お住まいの地域" id="2">
                                    {
                                        this.state.prefectures.map((prefecture:any, id:any)=>{
                                            return  <option value={prefecture.name} key={id}>{prefecture.name}</option>})
                                    }
                                </select>
                            </div>
                            
                            <textarea  className="form-text" onChange={this.handleChange} placeholder="備考" id="3">
                            </textarea>
                        </div> : null
                    }
                    <div className="estimate1">
                        {/* <a href="/account/request/new/complete"><button className="round-btn bg-black my-1">一斉見積もりを送信</button></a>     */}
                        <button onClick={this.handleSubmit} className="round-btn bg-black my-1">一斉見積もりを送信</button>   
                    </div>
                    
                </div>
            </div>
        );
}
}

