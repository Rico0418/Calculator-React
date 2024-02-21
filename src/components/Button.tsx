import React from "react";
import  Styled  from "styled-components";


export enum ButtonType {
    Number,
    Operation,
    Support,
    Equal
}
type Atribute ={
    type?: ButtonType;
    label: string;
    position?: [x:number, y:number];
    width?: number;
    onClick?: ()=> void;
};
const StyleButton = Styled.button`
    background: #d3d3d3;
    border: none;
    border-radius: 40px;
    color: white;
    font-size: 24px;
`;
const Button: React.FC <Atribute>= ({type= ButtonType.Operation,label,position,width,onClick}) =>{
    const styles: React.CSSProperties={};
    if(position){
        styles.gridColumnStart = position[0]+1;
        styles.gridRowStart = position[1]+1;
    }
    if(width){
        styles.gridColumnEnd = `span ${width}`;
    }
    if(type===ButtonType.Operation){
        styles.background= "#FFA500";
    }
    if(type===ButtonType.Support){
        styles.background= "#706233";
    }
    return <StyleButton style={styles} onClick={onClick}>{label}</StyleButton>;
};
export default Button;