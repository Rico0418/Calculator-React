import React, { useState } from "react";
import styled from 'styled-components';
import Button, { ButtonType } from "../components/Button";
import { useNavigate } from "react-router-dom";
const Body = styled.div`
    align-items: center;
    background: #000000;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
`;
const Grid = styled.div`
    padding-top: 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(4,80px);
    grid-template-rows: 200px repeat(5,80px);
`;
const DisplayContainer = styled.div`
    grid-column-end: span 4;
    display: grid;
    grid-template-rows: auto auto; /* Two rows: one for history and one for display */
    grid-gap: 10px;
 `;
const Display = styled.div`
    background: #808080;
    border-radius: 5px;
    text-align: right;
    font-size: 48px;
    padding-right: 20px;
    padding-top: 125px;
    color: #fff;
`;
const History=styled.div`
    font-size: 15px;
    color: #fff;
    max-height: 60px;
    margin-bottom: 0px;
    overflow-y: auto;
    position: absolute;
    margin-left: 8px;
    margin-top: 8px;
    /* for Firefox */
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    /* for chrome */
    &::-webkit-scrollbar {
    width: 6px;
    }
    &::-webkit-scrollbar-thumb {
    background-color: transparent;
    }
`;

const Calculator: React.FC<{}> = () =>{
    const [currentValue, setCurrentValue] = useState("0");
    const [operation, setOperation] = useState ("");
    const [history, setHistory] = useState<string[]>([]);
    const [operationClicked, setOperationClicked] = useState(false);

    const navigate = useNavigate();
    const buttonClick = (buttonLabel: string, buttonType?: ButtonType) =>{
        switch(buttonType){
            case ButtonType.Number:
                if (currentValue === "0" || operation === "=") {
                  setCurrentValue(buttonLabel);
                  setOperation("");
                  setOperationClicked(false);
                } else {
                  setCurrentValue((prevValue) => prevValue + buttonLabel);
                  setOperationClicked(false);
                }
                break;
              case ButtonType.Operation:
                setOperation(buttonLabel);
                if (!operationClicked && currentValue !== "0" && currentValue !== "Error" && currentValue !== "") {
                    setCurrentValue((prevValue) => prevValue + buttonLabel);
                    if (buttonLabel === "=") {
                        hitungHasil();
                        setOperationClicked(false);
                      } else {
                        setOperationClicked(true);
                      }
                  }
                  if(operation === "/" || operation === "*"){
                    if(currentValue.length >= 3){
                        hitungHasil();
                        setOperationClicked(false);
                    }
                }else if(operation === "-" || operation === "+"){
                    if(currentValue.length >= 3){
                        hitungHasil();
                        setOperationClicked(false);
                    }
                }
                break;
              case ButtonType.Equal:
                hitungHasil();
                break;
              default:
                break;
        }
    };
    const OperationClick = (buttonLabel: string) =>{
        if (currentValue !== "0" && currentValue !== "Error" && currentValue !== "") {
            setCurrentValue((prevValue) => prevValue + buttonLabel);
            setHistory((prevHistory) => [...prevHistory, currentValue]);
        }
        setOperation(buttonLabel);
    };
    const hitungHasil = () => {
    try {
      if(currentValue.length<3){
        return;
      }  
      const hasil = eval(currentValue);
      if(operation==="/" && hasil === Infinity){
        setCurrentValue("Err");
        setOperation("");
      }
      else{
        setCurrentValue(hasil.toString());
        setOperation("=");
        setHistory((prevHistory) => [...prevHistory, eval(currentValue)]);
      }
    } catch (error) {
      setCurrentValue("Error");
    }
  };
    return(
        <Body>
            <Grid>
                <DisplayContainer>
                    <History>{history.map((item,idx) => (<div key={idx}>{item}</div>))}</History>
                    <Display>{currentValue}</Display>
                </DisplayContainer>
                <Button type={ButtonType.Number} label="C" position={[0,1]} onClick={() => setCurrentValue("0")} />
                <Button type={ButtonType.Number} label="DEL" position={[1,1]} onClick={ () => {
                    if(operation==="="){
                        setCurrentValue("0");
                        setOperation("");
                    }else{
                        setCurrentValue((prevValue)=>(prevValue.length>1 ? prevValue.slice(0,-1): "0"));
                    }
                }} />
                <Button type={ButtonType.Support} label="?" position={[2,1]} onClick={()=> navigate("/form")} />
                <Button type={ButtonType.Operation} label="/" position={[3,1]} onClick={() => buttonClick("/", ButtonType.Operation)}/>
                
                
                <Button type={ButtonType.Number} label="1" position={[0,2]} onClick={() => buttonClick("1", ButtonType.Number)}/>
                <Button type={ButtonType.Number} label="2" position={[1,2]} onClick={() => buttonClick("2", ButtonType.Number)}/>
                <Button type={ButtonType.Number} label="3" position={[2,2]} onClick={() => buttonClick("3", ButtonType.Number)}/>
                <Button type={ButtonType.Operation} label="X" position={[3,2]} onClick={() => buttonClick("*", ButtonType.Operation)}/>

                <Button type={ButtonType.Number} label="4" position={[0,3]} onClick={() => buttonClick("4", ButtonType.Number)}/>
                <Button type={ButtonType.Number} label="5" position={[1,3]} onClick={() => buttonClick("5", ButtonType.Number)}/>
                <Button type={ButtonType.Number} label="6" position={[2,3]} onClick={() => buttonClick("6", ButtonType.Number)}/>
                <Button type={ButtonType.Operation} label="-" position={[3,3]} onClick={() => buttonClick("-", ButtonType.Operation)}/>

                <Button type={ButtonType.Number} label="7" position={[0,4]} onClick={() => buttonClick("7", ButtonType.Number)}/>
                <Button type={ButtonType.Number} label="8" position={[1,4]} onClick={() => buttonClick("8", ButtonType.Number)}/>
                <Button type={ButtonType.Number} label="9" position={[2,4]} onClick={() => buttonClick("9", ButtonType.Number)}/>
                <Button type={ButtonType.Operation} label="+" position={[3,4]} onClick={() => buttonClick("+", ButtonType.Operation)}/>
                

                <Button type={ButtonType.Number} label="0" position={[0,5]} width={2} onClick={() => buttonClick("0", ButtonType.Number)}/>
                <Button type={ButtonType.Operation}label="=" position={[2,5]} width={2} onClick={() => buttonClick("=", ButtonType.Equal)}/>
            </Grid>
        </Body>
    );
};

export default Calculator;