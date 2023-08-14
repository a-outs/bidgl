import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { shape, string } from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auction from './Auction';
import StorageKeys from '../StorageKeys';

export default function AuctionList({ location }) {
  const [auctions, setAuctions] = useState({});

  useEffect(() => {
    axios.get(`https://www.bidrl.com/api/landingPage/${location.url}`).then(async (res) => {
      console.log(res.data);

      const auctionIds = Object.values(res.data.auctions).map((auction) => auction.id);

      // remove blacklist items from old auctions
      const blacklist = JSON.parse(await AsyncStorage.getItem(StorageKeys.itemBlacklistKey));
      console.log(blacklist);
      // initialize blacklist object for location
      if (blacklist != null && blacklist[location.id] !== undefined) {
        const newLocationObject = {};
        blacklist[location.id] = Object.keys(blacklist[location.id])
          .filter((key) => auctionIds.includes(key))
          .reduce((obj, key) => {
            newLocationObject[key] = blacklist[location.id][key];
            return obj;
          }, {});
        blacklist[location.id] = newLocationObject;
        console.log(blacklist);
      }
      await AsyncStorage.setItem(StorageKeys.itemBlacklistKey, JSON.stringify(blacklist));

      setAuctions(res.data.auctions);
    });
  }, []);

  return (
    <View>
      {Object.values(auctions).map((auction) => (
        <Auction
          auction={auction}
          location={location}
          key={auction.id}
        />
      ))}
    </View>
  );
}

AuctionList.propTypes = {
  location: shape({ url: string }).isRequired,
};
