import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import Auction from './Auction';

export default function AuctionList({ location }) {
  const [auctions, setAuctions] = useState({});

  useEffect(() => {
    axios.get(`https://www.bidrl.com/api/landingPage/${location.url}`).then((res) => {
      console.log(res.data);
      setAuctions(res.data.auctions);
    });
  }, []);

  return (
    <View>
      {Object.values(auctions).map((auction) => <Auction auction={auction} key={auction.id} />)}
    </View>
  );
}
