import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';
import './GamePage.css';
import RLG, {WidthProvider} from 'react-grid-layout';

import { useNavigate } from 'react-router-dom';

const ReactGridLayout = WidthProvider(RLG);

function GamePage(props: any) {

    
    const navigate = useNavigate();
    const socket = props.ws;
    const status = props.statusMatch;
    const canShot = props.canShot;
    const shots = props.shots;
    const setShots = props.setShots;
    const shoteds = props.shoteds;
    const setShoteds = props.setShoteds;

    var layoutInit: RLG.Layout[] = [
        {i: "0", x: 0, y: 0, w: 5, h: 1},
        {i: "1", x: 0, y: 0, w: 4, h: 1},
        {i: "2", x: 0, y: 0, w: 3, h: 1},
        {i: "3", x: 0, y: 0, w: 3, h: 1},
        {i: "4", x: 0, y: 0, w: 2, h: 1},
        {i: "5", x: 0, y: 0, w: 2, h: 1},
        {i: "6", x: 0, y: 0, w: 2, h: 1},
    ]

    function loadShoteds() {
        let layoutShoteds: RLG.Layout[] = [];

        for (let y = 0; y < shoteds.length; y++) {
            for (let x = 0; x < shoteds[y].length; x++) {
                layoutShoteds.push({i: "0_"+y+""+x, x: x, y: y, w: 1, h: 1, static: true})
            }
        }

        return layoutShoteds;
    }

    function loadShots() {
        let layoutShots: RLG.Layout[] = [];

        for (let y = 0; y < shots.length; y++) {
            for (let x = 0; x < shots[y].length; x++) {
                layoutShots.push({i: "0_"+y+""+x, x: x, y: y, w: 1, h: 1, static: true})
            }
        }

        return layoutShots;
    }

    const [layout, setLayout] = React.useState(layoutInit)

    const onGridLayoutChange = (layout: RLG.Layout[]) => {
        setLayout(layout);
    }

    const handleTurnShip = (n : number) => {
        let newLayout: RLG.Layout[] = []
        for (let i = 0; i < layout.length; i++) {
            if (i !== n) {
                newLayout[i] = layout[i];
            } else {
                newLayout[i] = {...layout[n], w: layout[n].h, h: layout[n].w};
            }
        }
        setLayout(newLayout);
    }

    const handleSendBoard = () => {
        socket.emit("ready", sendBoard());
        console.log(sendBoard());
    }

    function sendBoard() {
        let temp: number[][] = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
        ];
        layout.forEach((l) => {
            for (let cw = 0; cw < l.w; cw++) {
                temp[l.y][l.x + cw] = 1;
            }
            for (let ch = 0; ch < l.h; ch++) {
                temp[l.y + ch][l.x] = 1;
            }
        })
        return temp;
    }

    const createRandomBoard = () => {
        let newBoard: RLG.Layout[] = [];
        let cond = true;
        while (cond) {
            for (let i = 0; i < layout.length; i++) {
                let t = layout[i];
                let swap = Math.floor(Math.random()*2)
                let rx = Math.floor(Math.random()*(10))
                let ry = Math.floor(Math.random()*(10))
                newBoard[i] = ({i: t.i, x: rx, y: ry, w: swap? t.h: t.w, h: swap? t.w: t.h})
            }
            cond = checkOverBounds(newBoard)
        }
        setLayout(newBoard);
    }

    const checkOverBounds = (layout: RLG.Layout[]) => {
        for (let index = 0; index < layout.length; index++) {
            if (layout[index].x+layout[index].w > 10 || layout[index].y+layout[index].h > 10) {
                return true;
            }
        }
        return false;
    }

    React.useEffect(() => {
        if (checkOverBounds(layout)) {
            createRandomBoard();
        }   
    });

    const buttonStyle = {color: 'white', borderRadius: '25px', width: '251px', height: '49px', alignItems: 'center', background: '#222459', boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.25)', margin: '20px'}

    const PositioningStage = () =>  {
        return (
            <>
            {status === "positioning"?
                <>
                <div style={{marginLeft: 'auto', marginRight: 'auto', position: 'relative', width: '480px', height: '466px', marginTop: '120px', border: '1px solid black', overflow: 'hidden'}}>
                    <div style={{width: '480px', height: '466px', position: 'absolute'}}>
                        <ReactGridLayout
                            className='layout'
                            preventCollision={true}
                            cols={10}
                            rowHeight={36}
                            compactType={null}
                            layout={layout}
                            maxRows={10}
                            isBounded={true}
                            onLayoutChange={onGridLayoutChange}
                        >
                            {layout.map((l) => {
                                return <div key={l.i} className="ships" onDoubleClick={() => {handleTurnShip((parseInt(l.i)) )}} />
                            })}
                        </ReactGridLayout>
                    </div>
                </ div>
                <button style={buttonStyle} onClick={() => {createRandomBoard()}}>Aleatorio</button>
                <button style={buttonStyle} onClick={() => {handleSendBoard()}}>Enviar</button>
                </>
                :
                <></>
            }
            {status === "play"?
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginLeft: 'auto', marginRight: 'auto', position: 'relative', width: '480px', height: '466px', marginTop: '120px', border: '1px solid black', overflow: 'hidden'}}>
                    <div style={{width: '480px', height: '466px', position: 'absolute'}}>
                        <ReactGridLayout
                            className='layout'
                            preventCollision={true}
                            cols={10}
                            rowHeight={36}
                            compactType={null}
                            layout={layout}
                            maxRows={10}
                            isBounded={true}
                            onLayoutChange={onGridLayoutChange}
                        >
                            {layout.map((l) => {
                                return <div key={l.i} className="ships" onDoubleClick={() => {handleTurnShip((parseInt(l.i)) )}} />
                            })}
                        </ReactGridLayout>
                    </div>
                    <div style={{width: '480px', height: '466px', position: 'absolute'}}>
                        <ReactGridLayout
                            className='layout'
                            preventCollision={true}
                            cols={10}
                            rowHeight={36}
                            compactType={null}
                            layout={loadShoteds()}
                            maxRows={10}
                            isBounded={true}
                        >
                            {loadShoteds().map((l) => {
                                return <div key={l.i} className={(shoteds[l.y][l.x] === 1)? "shoted":"shotedno"} />
                            })}
                        </ReactGridLayout>
                    </div>
                </ div>
                <div style={{marginLeft: 'auto', marginRight: 'auto', position: 'relative', width: '480px', height: '466px', marginTop: '120px', border: '1px solid black', overflow: 'hidden'}}>
                    <div style={{width: '480px', height: '466px', position: 'absolute'}}>
                        <ReactGridLayout
                            className='layout'
                            preventCollision={true}
                            cols={10}
                            rowHeight={36}
                            compactType={null}
                            layout={loadShots()}
                            maxRows={10}
                            isBounded={true}
                        >
                            {loadShots().map((l) => {
                                return <div key={l.i} onClick={() => {
                                    if (canShot) {
                                        let temp = shots;
                                        temp[l.y][l.x] = 1;
                                        setShots(temp)
                                        socket.emit("shot", {x: l.x, y: l.y});
                                    }
                                }
                                } className={(shots[l.y][l.x] === 1)? "shoton":((shots[l.y][l.x] === 2)? "shotno" : "shots")} />
                            })}
                        </ReactGridLayout>
                    </div>
                </ div>
                </ div>
                :
                <></>
            }
            </>
        )
    }

    return (
        <div className="game-container">
            <PositioningStage />
            {props.matchOver? <button onClick={() => {navigate("/home")}}>Home</button> : <></>}
        </div>
    )
}

export default GamePage;