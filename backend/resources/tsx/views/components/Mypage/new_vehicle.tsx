import React from 'react';
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';


interface State {
    vehicle?: string
}

export class New_vehicle extends React.Component<{}, State> {
    

    constructor(props:any){
        super(props);

        this.state = {
            vehicle:'車',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleChange(e:any){

        this.setState({ vehicle: e.target.value})
    }

    handleNext=()=>{
        console.log(JSON.stringify({"vehicle":this.state.vehicle}));
        localStorage.setItem("vehicle",JSON.stringify({"vehicle":this.state.vehicle}));
    }

    render(){
        return (
            <div>
                <div className="info">
                    <h2 className="text-1">車かバイクを選択してください</h2> 
                    <div className="checkbox">  
                        <label className="container">車
                            <input type="radio"   name="vehicle" onChange={this.handleChange} defaultChecked value="車"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">バイク
                            <input type="radio"  name="vehicle" onChange={this.handleChange}  value="バイク"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="estimate">
                        <Link to="/account/request/new/image/">
                        <button onClick={this.handleNext} className="round-btn bg-black my-1">次のステップへ</button></Link>     
                        {/* <a href="/account/request/new/image/">
                        <button className="round-btn bg-black my-1">次のステップへ</button></a>      */}
                    </div>
                </div>
            </div>
        );
    }
}
