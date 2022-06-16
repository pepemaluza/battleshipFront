import React from 'react';
import RLG, {WidthProvider} from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RLG);

function GamePage() {

    var layoutInit: RLG.Layout[] = [
        {i: "0", x: 0, y: 0, w: 5, h: 1},
        {i: "1", x: 0, y: 0, w: 4, h: 1},
        {i: "2", x: 0, y: 0, w: 3, h: 1},
        {i: "3", x: 0, y: 0, w: 3, h: 1},
        {i: "4", x: 0, y: 0, w: 2, h: 1},
        {i: "5", x: 0, y: 0, w: 2, h: 1},
        {i: "6", x: 0, y: 0, w: 2, h: 1},
    ]

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
        //TODO send connect to backend.
        console.log(layout)
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

    const PositioningStage = () =>  {
        return (
            <>
            <div style={{marginLeft: 'auto', marginRight: 'auto', position: 'relative', width: '480px', marginTop: '120px', border: '1px solid black', overflow: 'hidden'}}>
                <div style={{width: '480px', height: '480px'}}>
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
                            return <div key={l.i} onDoubleClick={() => {handleTurnShip((parseInt(l.i)) )}} />
                        })}
                    </ReactGridLayout>
                </div>
            </div>
            <button onClick={() => {createRandomBoard()}}>Aleatorio</button>
            <button onClick={() => {handleSendBoard()}}>Enviar</button>
            </>
        )
    }

    return (
        <div className="game-container">
            <PositioningStage />
        </div>
    )
}

export default GamePage;