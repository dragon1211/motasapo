import React, { useState } from "react";
import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css'


type Props = {
    id: number
    imgUri: string
    handleChange:any
    children:React.ReactNode
}

export const NewImage: React.FC<Props> = (props) => {

    const [imgUri, setImgUri] = useState<any>(null);

    const handleImageChange = (e: any) => {
        e.preventDefault();
        let reader = new FileReader();
        let _file = e.target.files[0];

        reader.readAsDataURL(_file);

        reader.onloadend = () => {
            // console.log(reader.result, typeof reader.result);
            setImgUri(reader.result);
        };
    };
    

    return (
        <div className=" img-upload">
            <div style={{ width:'100%', height:'100%' }} >
                <input type="file" id={`img-upload${props.id}`} name={`img-upload${props.id}`} accept=".png, .jpg, .jpeg" onChange={(e: any) => props.handleChange(e)}/>
                    <img src={imgUri} className="image-preview"/>
                <label htmlFor={`img-upload${props.id}`}>
                    <img src="/storage/base/Group 93.png" className="img-select" alt="add-img" />
                </label>
            </div>    
        </div>
    );
}

export default NewImage;
