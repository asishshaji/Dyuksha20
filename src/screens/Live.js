import React, { Component } from 'react';
import MetroTabs from '../components/MetroTabs';
import Today from './LiveScreens/Today';
import Memories from './LiveScreens/Memories';
import AllPosts from './LiveScreens/AllPosts';
import Scoreboard from './LiveScreens/Scoreboard';

export default class Live extends Component {
  render() {
    return (
      <MetroTabs
        screens={[
          { key: '1', title: 'Today', screen: <Today /> },
          { key: '2', title: 'Scoreboard', screen: <Scoreboard /> },
          { key: '3', title: 'All Posts', screen: <AllPosts /> },
          { key: '4', title: 'Memories', screen: <Memories /> },
        ]}
      />
    );
  }
}