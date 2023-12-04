import React, { useEffect } from 'react';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io';

function Navbar(props: any) {
  const navigate = useNavigate();

  const shots = props.shots;
  const setShots = props.setShots;
  const shoteds = props.shoteds;
  const setShoteds = props.setShoteds;

  const location = useLocation();

  const [searchingOpponent, setSearchingOpponent] = React.useState(false);
  const [stage, setStage] = React.useState('Positioning');

  const handleSearchOponnent = () => {
    props.ws.emit('searchRoom', {
      socket: props.ws.id,
      user: props.user.email,
    });
    setSearchingOpponent(true);
  };

  useEffect(() => {
    if (props.ws !== null) {
      props.ws.on('founded', () => {
        props.setStatusMatch('positioning');
        setSearchingOpponent(false);
        navigate('/play');
      });

      props.ws.on('waiting', () => {
        props.setStatusMatch('waiting');
        setStage('Waiting');
      });

      props.ws.on('play', (data: { play: boolean }) => {
        props.setStatusMatch('play');
        if (data.play) {
          setStage('Your Turn, can shot.');
          props.setCanShot(true);
        } else {
          setStage('Opponent Turn, wait.');
          props.setCanShot(false);
        }
      });

      props.ws.on(
        'waitOpponent',
        (data: { shot: number; x: number; y: number }) => {
          setStage('Opponent Turn, wait.');
          props.setCanShot(false);
          let temp = shots;
          temp[data.y][data.x] = data.shot;
          setShots(temp);
        }
      );

      props.ws.on('yourTurn', (data: { x: number; y: number }) => {
        props.setCanShot(true);
        setStage('YourTurn');
        let temp = shoteds;
        temp[data.y][data.x] = 1;
        setShoteds(temp);
      });

      props.ws.on('loss', () => {
        setStage('YOU LOSE.');
        props.setMatchOver(true);
      });

      props.ws.on('win', () => {
        setStage('YOU WIN.');
        props.setMatchOver(true);
      });
    }
  }, [props.ws]);

  const PlayButton = () => {
    return (
      <div className='nav-home'>
        <button
          disabled={searchingOpponent}
          className='button-play'
          onClick={() => {
            handleSearchOponnent();
          }}
        >
          PLAY!
        </button>
        {searchingOpponent && (
          <p style={{ fontWeight: '500' }}>Searching Oponent ...</p>
        )}
        <div
          style={{
            marginLeft: 'auto',
            marginRight: '40px',
            height: '64px',
            width: '64px',
            borderRadius: '32px',
            backgroundColor: 'darkred',
            fontSize: '24px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <img
            src={props.user.picture}
            height={64}
            width={64}
            style={{ borderRadius: '32px' }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className='navbar-container'>
      {location.pathname === '/home' && <PlayButton />}
      {location.pathname === '/play' && (
        <p
          style={{
            marginLeft: '32px',
            font: '600 32px -apple-system',
            color: 'white',
          }}
        >
          {stage}
        </p>
      )}
    </div>
  );
}

export default Navbar;
