import React, {Component} from 'react';
import axios from 'axios';
import './comments.css';
import {Comment} from './comment'

// import {test_data} from './test_data';
import {Person} from './comment'

interface State {
    comment_text: string;
    test_data: Array<Person>;
    load_flag: Boolean;
}

export class CommentBox extends Component <{},State> {
    test_data:any;

    constructor(Props: any){
        super(Props);
        this.getData();
        this.state = {
            comment_text : '',
            test_data: [],
            load_flag: false
        }
        this.comment_text = this.comment_text.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    comment_text(event:any){
        this.setState({comment_text : event.target.value})
        console.log(this.setState);
    }

    getData =  () =>{
        axios.post('/account/post/api')
        .then(response=>{
                    this.setState({
                        test_data: [...response.data],
                        load_flag: true
                    })
                console.log(this.state.test_data);
        })
     
    }

    handleSubmit() {
        const comment_data = { comment_text: this.state.comment_text };
        axios.post('/account/post/addcomment', comment_data)
            .then(response => {
                this.setState({
                    test_data: [...response.data],
                    load_flag: true
                })
                console.log(this.state.test_data);
            })
            .catch(error => {
                console.log("ERROR:: ",error.response.data);
            });
    }

    render(){
        console.log(this.state.test_data);
        return (
            this.state.load_flag == true ? (
                <div className="l-main wrap">
                    <div className="wrap-inner">
                        {this.state.test_data.map((person, id)=> <Comment data={person}  key={id}/>)}

                    </div>
                    <div className="comment-lav">
                        <div className="comment-field">
                            <div className="comment-img">
                                <a href={`/account/gps/detail/sample-human1.png`}><img src={`/storage/base/sample-human1.png`}  className="avatars" alt={`/storage/base/sample-human1.png`}/></a>
                            </div>
                            <div className="comment-input">
                                <input className="comment-text" type="text" name="comment_text" id="comment_text" onChange={this.comment_text} />
                                {/* <input className="btn-comment" type="submit" value="Post" onClick={this.handleSubmit} /> */}
                                <img src={`/storage/base/send.svg`} onClick={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
               
            ) : null
        );
    }
}
