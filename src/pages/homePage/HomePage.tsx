import React from 'react';
import './HomePage.css';
import { PieChart } from 'react-minimal-pie-chart';

function HomePage() {

    //TODO fetch userStats from back.
    const userStats = {played: 229, wins: 108, losses: 99, disconnects: 22, firstMatch: "Thu Jun 9 2022 07:23:48 GMT-0300 (hora estándar de Argentina)", lastMatch: Date(), inMatch: true};

    const TotalGamesPie = () => {
        return (
            <div style={{width: '200px', height: '200px', alignContent: 'center'}}>
                <PieChart
                    data={[
                        { title: 'Wins', value: userStats.wins, color: 'darkgreen' },
                        { title: 'Losses', value: userStats.losses, color: 'darkred' },
                        { title: 'Disconnects', value: userStats.disconnects, color: 'grey'}
                    ]}
                    lineWidth={60}
                    label={({ dataEntry }) => dataEntry.value}
                    labelPosition={70}
                    labelStyle={{font: '700 8px -apple-system'}}
                    startAngle={270}
                />;
            </div>
        )
    }

    return (
        <div className="home-container">
            <h1 style={{marginTop: '120px', marginBottom: '8px', font: '400 60px -apple-system'}}>Summary</h1><hr />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <div style={{width: '240px', textAlign: 'left'}}>
                    <h1>Games</h1>
                    <TotalGamesPie />
                    <p>Played: <b>{userStats.played}</b></p>
                    <p>Wins: <b>{userStats.wins}</b></p>
                    <p>Losses: <b>{userStats.losses}</b></p>
                    <p>Disconnects: <b>{userStats.disconnects}</b></p>
                </div>
                <div style={{width: '240px', textAlign: 'right'}}>
                    <h1>Dates</h1>
                    <p>First match: <b>{userStats.firstMatch}</b></p>
                    <p>Last match: <b>{userStats.lastMatch}</b> <span style={{color: 'red'}}>{userStats.inMatch? "[InProgress]": "" }</span></p>
                </div>
            </div>
            
        </div>
    );
}

export default HomePage;
