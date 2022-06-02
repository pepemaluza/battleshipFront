import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import LoginPage from './pages/loginPage/LoginPage'
import HomePage from './pages/homePage/HomePage'

import RLG, {WidthProvider} from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RLG);

function App() {

    const layout = [
        {i: "1", x: 0, y: 0, w: 4, h: 1},
        {i: "2", x: 4, y: 0, w: 2, h: 1},
        {i: "3", x: 6, y: 0, w: 2, h: 1},
        {i: "4", x: 0, y: 0, w: 3, h: 1},
        {i: "5", x: 0, y: 1, w: 1, h: 1},
        {i: "6", x: 2, y: 2, w: 1, h: 3},
    ]

    const onLayoutChange = (layout: RLG.Layout[]) => {
        alert(layout.flatMap(e => {return e.x}))
    }

    //{i: "key", x: 0, y: 0, l: 4, v: 0}

    const span = 1;

    return (
        <div className="App">
            <ReactGridLayout
                className='layout'
                cols={10}
                rowHeight={30}
                verticalCompact={false}
                layout={layout}
                maxRows={10}
                onLayoutChange={onLayoutChange}
            >
                <div key="1" title='OKOK' onDoubleClick={() => {alert("Clicked.")}} />
                <div key="2" />
                <div key="3" />
                <div key="4" />
                <div key="5" />
                <div key="6" />
            </ReactGridLayout>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, distinctio.</h1>
        </div>
    );
}

export default App;
