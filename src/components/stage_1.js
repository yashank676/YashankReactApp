import React, { useState, useContext, useRef } from "react";
import { Button, Form, Alert } from "react-bootstrap";

import { MyContext } from "../context";


const Stage1=()=>{

    const texInput = useRef();// to access input in the inputfield
    const [error,setError] = useState([false,""]);// to handle error in the input
    const context = useContext(MyContext);

    console.log(context.state.players)

    const handleSubmit = (eventArg)=>{
        eventArg.preventDefault();// to prevent reload on submit
        const inputValue = texInput.current.value;
        const isValid = validateInput(inputValue);
        if(isValid)
        {
            // we need to add player to the list and empty the input
            console.log(inputValue);
            context.addPlayer(inputValue);

            texInput.current.value = "";
        }
    };

    const validateInput = (value)=>{
        if(value==="")
        {
            setError([true,"Please Add Something"]);
            return false;
        }
        if(value.length <= 2)
        {
            setError([true,"Enter name of length atleast 3"]);
            return false;
        }
        setError([false,""]);
        return true;
    };

    return (
      <>
        <Form onSubmit={handleSubmit} className="mt-3">
            
            <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Add player name"
                  name="player"
                  ref={texInput}
                />
            </Form.Group>
            
            {
                error[0]?
                <Alert variant="danger">
                    {error[1]}
                </Alert>
                :
                null
            }

            <Button className="mt-3" variant="outline-primary" type="submit">
            Add Player
            </Button>

            {
                context.state.players.length>0 ? 
                <>
                    <hr/>
                    <div>
                        <ul className="list-group">
                            {
                                context.state.players.map((item,index)=>{
                                    return (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center list-group-item-center">
                                            {item}
                                            <span className="badge badge-danger" onClick={() => context.removePlayer(index)}>x</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <div className="action_button" onClick={() => context.next()}>
                            NEXT
                        </div>
                    </div>
                </>
                :
                null
            }
        
        </Form>
  
      </>
    );
}

export default Stage1;
