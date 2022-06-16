import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import LoginPage from './pages/loginPage/LoginPage'
import HomePage from './pages/homePage/HomePage'

import RLG, {WidthProvider} from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RLG);

function App() {

    var layoutInit: RLG.Layout[] = [
        {i: "0", x: 9, y: 0, w: 5, h: 1},
        {i: "1", x: 0, y: 0, w: 4, h: 1},
        {i: "2", x: 0, y: 0, w: 3, h: 1},
        {i: "3", x: 6, y: 0, w: 3, h: 1},
        {i: "4", x: 0, y: 0, w: 2, h: 1},
        {i: "5", x: 0, y: 1, w: 2, h: 1},
        {i: "6", x: 2, y: 2, w: 2, h: 1},
    ]
    
    const [layout, setLayout] = React.useState(layoutInit)

    const onLayoutChange = (layout: RLG.Layout[]) => {
        setLayout(layout);
    }

    //{i: "key", x: 0, y: 0, l: 4, v: 0}
    const base: RLG.Layout = {i: "1", x: 0, y: 0, w: 4, h: 1};

    const handleTurnShip = (n : number) => {
        const layoutBis: RLG.Layout[] = []
        for (let index = 0; index < layout.length; index++) {
            if (index !== n) {
                layoutBis.push(layout.at(index) || base);
            } else {
                const temp = {i: layout.at(n)?.i || "", x: layout.at(n)?.x || 0, y: layout.at(n)?.y || 0, w: layout.at(n)?.h || 0, h: layout.at(n)?.w || 0};
                layoutBis.push(temp);
            }
        }
        setLayout(layoutBis);
    }

    const handleSendBoard = () => {
        alert(layout.toString)
    }

    const randomBoard = () => {
        const newBoard: RLG.Layout[] = [];
        for (let index = 0; index < layout.length; index++) {
            let t = layout[index];
            let swap = Math.floor(Math.random()*2)
            newBoard.push({i: t.i, x: Math.floor(Math.random()*(10)), y: Math.floor(Math.random()*(10)), w: swap? t.h: t.w, h: swap? t.w: t.h})
        }
        setLayout(newBoard);
    }

    return (
        <div className="App">
            <Navbar />
            <div style={{marginLeft: 'auto', marginRight: 'auto', position: 'relative', width: '480px', marginTop: '120px', border: '1px solid black'}}>
            <div style={{width: '480px', height: '480px'}}>
                <ReactGridLayout
                    className='layout'
                    preventCollision={true}
                    autoSize
                    cols={10}
                    rowHeight={36}
                    verticalCompact={false}
                    layout={layout}
                    maxRows={10}
                    isBounded={true}
                    onLayoutChange={onLayoutChange}
                >
                    {layout.map((lay) => {
                        return <div key={lay.i} onDoubleClick={() => {handleTurnShip((parseInt(lay.i)) )}} />
                    })}
                </ReactGridLayout>
            </div>
            </div>
            <button onClick={() => {handleSendBoard()}}>Enviar</button>
            <button onClick={() => {randomBoard()}}>Aleatorio</button>
        </div>
    );
}

export default App;
