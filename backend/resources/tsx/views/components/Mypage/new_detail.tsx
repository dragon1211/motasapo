import React from 'react';
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

interface detail_data{

    brandname?:string, 
    vehicletype?:string, 
    grade?:string,
    color?:string,
    mileage?:string 
}

interface State{
    detail: detail_data

}

export class New_detail extends React.Component<detail_data, State> {


    constructor(props:any){
        super(props);
        this.state = {
            detail: {brandname:'',vehicletype:'',grade:'',color:'',mileage:''}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleChange(e:any){

        var key = e.target.placeholder;
        var cur_detail = this.state.detail;
        switch(key){
            case 'ブランド名': cur_detail.brandname = e.target.value; break;
            case '車種': cur_detail.vehicletype = e.target.value; break;
            case 'グレード': cur_detail.grade = e.target.value; break;
            case '色': cur_detail.color = e.target.value; break;
            case '走行距離': cur_detail.mileage = e.target.value; break;
        }
        this.setState({
           detail: cur_detail
        });
    }

    handleNext=()=>{
        console.log(JSON.stringify({"detail":this.state.detail}));
        localStorage.setItem("detail",JSON.stringify({"detail":this.state.detail}));
    }
    
    render(){
        return (
            <div>
                <div className="info">
                    <h2 className="text-2">詳細を入力してください</h2> 
                    
                    <form>
                        <input type="text" className="form-text" onChange={this.handleChange} placeholder="ブランド名"/>
                        <input type="text" className="form-text" onChange={this.handleChange} placeholder="車種"/>
                        <input type="text" className="form-text" onChange={this.handleChange} placeholder="グレード" />
                        <input type="text" className="form-text" onChange={this.handleChange} placeholder="色" />
                        <input type="text" className="form-text" onChange={this.handleChange} placeholder="走行距離" />
                    </form>

                    <div className="estimate1 ">
                        {/* <a href="/account/request/new/request"><button className="round-btn bg-black my-1">最後のステップへ</button>
                        </a>         */}
                        <Link to="/account/request/new/request"><button onClick={this.handleNext} className="round-btn bg-black my-1">最後のステップへ</button>
                        </Link>        
                    </div>
                    
                </div>
            </div>
        );
    }
}
