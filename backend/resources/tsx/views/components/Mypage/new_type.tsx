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
    wish?: string
}

export class New_type extends React.Component<{}, State> {


    constructor(props:any){
        super(props);

        this.state = {
            wish:'購入',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }
    
    handleChange(e:any){
        
        this.setState({wish: e.target.value})
    }

    handleNext=()=>{

        console.log(JSON.stringify({"wish":this.state.wish}));
        localStorage.setItem("wish",JSON.stringify({"wish":this.state.wish}));
    }

    render(){
        return (
                <div>
                    <div className="info">
                        <h2 className="text-1">希望を選んでください</h2>
                        <div className="checkbox">
                            <label className="container">購入
                                <input type="radio" name="type" onChange={this.handleChange} defaultChecked  value="購入"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">買取
                                <input type="radio" name="type" onChange={this.handleChange}  value="買取"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">カスタム                                                                                                                                                                      
                                <input type="radio" name="type" onChange={this.handleChange}  value="カスタム"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="estimate">
                            <Link to="/account/request/new/vehicle/">
                                <button onClick={this.handleNext} className="round-btn bg-black my-1">次のステップへ</button>
                            </Link>
                            {/* <a href="/account/request/new/vehicle/">
                                <button className="round-btn bg-black my-1">次のステップへ</button>
                            </a>       */}
                        </div>
                    </div>
                </div>
        );
    }
}
