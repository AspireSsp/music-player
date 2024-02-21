import React from 'react';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import ExploreNew from '../component/ExploreNew';
import Player from '../component/Player';
import TrackList from '../component/TrackList';

const Home = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', height:'10vh', background:'#ebecf3',display: 'flex', alignItems: 'center', justifyContent:'center' }}>
        <Header />
      </div>
      <div style={{ display: 'flex', flex: 1, height: '100%' }}>
        <div style={{ width: '5%', background: '#FAFAFA' }}>
          <SideBar />
        </div>
        <div style={{ width: '25%', background: '#FFFFFF',  }}>
          <ExploreNew />
        </div>
        <div style={{ width: '45%', background: '#FAFAFA' }}>
          <Player />
        </div>
        <div style={{ width: '25%', background: '#FFFFFF' }}>
          <TrackList />
        </div>
      </div>
    </div>
  );
};

export default Home;
