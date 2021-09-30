import React from "react";
import { ToastContainer, toast } from "react-toastify";

const MyContext = React.createContext();

class MyProvider extends React.Component{

    state = {
        stage: 1,
        players: [],
        result: ""
    };

    addPlayer = (name)=>{
        this.setState((prevState)=>({
            players: [
                ...prevState.players,
                name
            ]
        }))
    }

    removePlayer = (index)=>{
        let newArr = this.state.players;
        newArr.splice(index,1);
        this.setState({players: newArr});
    }

    next = ()=>{
        if(this.state.players.length<2)
        {
            toast.error("You need more than one player",{
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000
            })
        }
        else{
            // console.log("show stage 2");
            this.setState({
                stage: 2
            },()=>{
                setTimeout(()=>{
                    this.getLooser();
                },2000);
            });
        }
    }

    getLooser = ()=>{
        this.setState({
            result: this.state.players[Math.floor(Math.random() * this.state.players.length)]
        })
    };

    resetGame = ()=>{
        this.setState({
            stage: 1,
            players: [],
            result: ""
        })
    };

    render()
    {
        return (
            <>
            <MyContext.Provider value={{
                state: this.state,
                addPlayer: this.addPlayer,
                removePlayer: this.removePlayer,
                next: this.next,
                getNewLooser: this.getLooser,
                resetGame: this.resetGame
            }}>
                {this.props.children}
            </MyContext.Provider>
            <ToastContainer/>
            </>
        );
    }

}

export {MyContext,MyProvider};