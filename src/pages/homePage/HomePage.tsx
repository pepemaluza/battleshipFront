import React from 'react';
import './HomePage.css';
import { PieChart } from 'react-minimal-pie-chart';

function HomePage() {

    //TODO fetch userStats from back.
    const userStats = {played: 229, wins: 108, losses: 99, disconnects: 22};

    const TotalGamesPie = () => {
        return (
            <div style={{width: '240px', height: '240px'}}>
                <PieChart
                    data={[
                        { title: 'Wins', value: userStats.wins, color: 'darkgreen' },
                        { title: 'Losses', value: userStats.losses, color: 'darkred' },
                        { title: 'Disconnects', value: userStats.disconnects, color: 'grey'}
                    ]}
                    lineWidth={60}
                    label={({ dataEntry }) => dataEntry.value}
                    labelPosition={70}
                    labelStyle={{fontSize: '8px', fontWeight: '700'}}
                    startAngle={270}
                />;
            </div>
        )
    }

    return (
        <div className="home-container">
            <TotalGamesPie />
        </div>
    );
}

export default HomePage;
