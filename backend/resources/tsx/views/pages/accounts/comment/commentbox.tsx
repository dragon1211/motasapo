import React, {Component} from 'react';
import axios from 'axios';
import './comments.css';
import {Comment} from './comment'
import Hello from "./Hello";

// import {test_data} from './test_data';
import {Person} from './comment'
import { NavItem } from 'react-bootstrap';

interface State {
    comment_text: string;
    test_data: Array<Person>;
    load_flag: Boolean;
    account_id?: Number;
}

export class CommentBox extends Component <{},State> {
    test_data:any;

    constructor(Props: any){
        super(Props);
        this.getData();
        this.state = {
            comment_text : '',
            test_data: [],
            load_flag: false,
            account_id: -1
        }
        this.comment_text = this.comment_text.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    users = [
        {
            d: "mike",
            display: "Mike Ehrmantraut"
        }
    ];

    comment_text(event:any){
        this.setState({comment_text : event.target.value})
        // console.log(this.setState);
    }

    getData =  () =>{
        axios.post('/account/post/api')
        .then(response=>{
                    this.setState({
                        test_data: [...response.data],
                        load_flag: true,
                    })
                console.log(this.state.test_data);
        })

    }

    handleSubmit() {
        const comment_data = { comment_text: this.state.comment_text,  account_id: this.state.account_id};
        axios.post('/account/post/addcomment', comment_data)
            .then(response => {
                this.setState({
                    test_data: [...response.data],
                    load_flag: true
                })
                // console.log(this.state.test_data);
            })
            .catch(error => {
                console.log("ERROR:: ",error.response.data);
            });
    }

    handleClick = (name : any, id:any) =>{
        this.setState({
            comment_text:name,
            account_id: id
        });
    }

    onChange = (e:any) => {
        this.setState({comment_text : ''});
        console.log('change');
    };
    onAdd = () => {
        console.log("add");
    };

    render(){
        // console.log(this.state.test_data);
        return (
            this.state.load_flag == true ? (
                <div className="l-main wrap">
                    <div className="wrap-inner">
                        {this.state.test_data.map((person, id)=> <Comment data={person}  key={id} handleClick = {this.handleClick}/>)}
                    </div>
                    <div className="comment-lav">
                        <div className="comment-field">
                            <div className="comment-img">
                                <a href={`/account/gps/detail/sample-human1.png`}><img src={`/storage/base/sample-human1.png`}  className="avatars" alt={`/storage/base/sample-human1.png`}/></a>
                            </div>
                            <div className="comment-input">
                                {/* <input className="comment-text" type="text" name="comment_text" id="comment_text" onChange={this.comment_text} value={this.state.comment_text}/> */}
                                <Hello data={this.users} value={this.state.comment_text} onAdd={this.onAdd} onChange={this.onChange}/>
                            <img src={`/storage/base/send.svg`} onClick={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null
        );
    }
}
