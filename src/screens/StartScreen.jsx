import React from 'react';

function StartScreen() {

    const handleClick= () => {
        console.log('Clicked')
    }

    return(
        <div style={{backgroundColor:'gray'}}>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
            <h1>Welcome to Rat-Man</h1>
                <h2> Enter your name: </h2>
                    <form onSubmit={this.handleSubmit}/>
            <button onClick={() => handleClick()} type='button'> Enter name</button>
            </div>
        </div>
    )
   }


export default StartScreen;
