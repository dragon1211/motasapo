import ReactDOM from "react-dom";
import React, { useState } from "react";
// import  '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import axios from "axios";

interface Data{
    id:number
    imgUri: any
    flag: boolean
}

type State = {
    SAMPLE_IMAGES:Array<Data>
    current_pos: number
}

export class NewImages extends React.Component<{},State>{

    constructor(props:any){
        super(props);
        var images = Array<Data>();
        for(let i=0; i<20; i++){   images.push({id:i, imgUri:'', flag: false}); }

        this.state = {
            SAMPLE_IMAGES : [...images],
            current_pos : 0
        }
    }

    handleNext = ()=> {
        console.log(JSON.stringify({"images":this.state.SAMPLE_IMAGES}));
        const data = new FormData();
        data.append("images", JSON.stringify(this.state.SAMPLE_IMAGES));
        
        axios({
            method: "post",
            url: "/account/request/new/uploadimages",
            data: data,
            headers: { "Content-Type": "multipart/form-data"}
           }).then((res:any)=>{
                // console.log(JSON.parse(res));
                console.log(res.data);
                // window.location.assign("/account/mypage");
                
           }).catch((error:any)=>{
                console.log('err')
           });
        // localStorage.setItem("images", JSON.stringify({"images":this.state.SAMPLE_IMAGES}))
    }
     
   

    handleImageChange = (e: any, id:any) => {
        e.preventDefault();
        console.log(id);
        var reader = new FileReader();
        let _file = e.target.files[0];
        reader.readAsDataURL(_file);
        
        reader.onloadend = () => {
           var images = this.state.SAMPLE_IMAGES;
           let t = this.state.current_pos;
                images[t].flag = true;
                images[t].imgUri = reader.result;  
            this.setState({
                SAMPLE_IMAGES : [... images],
                current_pos : t+1
            })
        };
    };

    removeImg(id:any){
        var images = this.state.SAMPLE_IMAGES;
        let t = this.state.current_pos;
        for(let i=id; i<t-1; i++){
            images[i].imgUri = images[i+1].imgUri;
            images[i].flag = images[i+1].flag;
        }
        images[t-1].imgUri = '';
        images[t-1].flag = false;
        // for(let i=0; i < images.length; i++)
        // {   
        //     if(i == id){
        //         images[i].imgUri = images[i+1].imgUri;
        //         images[i+1].flag = false;
        //         images[i+1].imgUri = '';
        //     }
        // }
        this.setState({
            SAMPLE_IMAGES : [... images],
            current_pos : t-1
        })
    }

    render(){

    return (<div>
        <div className="info">
            <h2 className="text-1">写真を選択してください</h2>
            <h3>買取をする現在の車両の写真を添付してくだ さい。</h3> 
            <form>
                <div className="" style={{ display:"flex", flexWrap:"wrap" ,margin:"10px -10px"}}>
                    {
                        this.state.SAMPLE_IMAGES.map((item, id)=>
                            <div className=" img-upload" key={id}>
                                <div style={{ width:'100%', height:'100%' }} >
                                    <input type="file" id={`img-upload${item.id}`} name={`img-upload${item.id}`} accept=".png, .jpg, .jpeg" onChange={(e: any) => this.handleImageChange(e, id)}/>
                                    {
                                        item.flag && <img src={item.imgUri} className="image-preview"/>
                                    }
                                    
                                        {
                                            !item.flag ? (
                                                <label htmlFor={`img-upload${item.id}`}>
                                                    <img src="/storage/base/add.png" className="img-select" alt="add-img" />
                                                </label>
                                            ):(
                                                <img src="/storage/base/remove.png" className="img-select" alt="add-img" onClick={()=>this.removeImg(id)}/>
                                            )              
                                        }
                                </div>    
                            </div>)
                    }
                </div>
            </form>
            <div className="estimate">
                {/* <a href="/account/request/new/detail">
                <button className="round-btn bg-black my-5">次のステップへ</button>  </a>       */}
                <Link to="/account/request/new/detail">
                <button onClick={this.handleNext}className="round-btn bg-black my-5">次のステップへ</button>  
                </Link>      
            </div>
        </div>
    </div>)
    }
}

// const ImageUpload : React.FC = () =>{


    
//         return(
//             <div className=" img-upload">
//                         <div style={{ width:'100%', height:'100%' }} >
//                             <input type="file" id="img-upload" accept=".png, .jpg, .jpeg" onChange={(e: any) => handleImageChange(e)}/>
//                                 <img src={imgUri} className="image-preview"/>
//                             <label htmlFor="img-upload">
//                                 <img src="/storage/base/Group 93.png" className="img-select" alt="add-img" />
//                             </label>
//                         </div>    
//                     </div>
//         )
    
// }
