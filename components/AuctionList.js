import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { shape, string } from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auction from './Auction';
import StorageKeys from '../StorageKeys';
import Favorites from './Favorites';
import { useNotification } from '../contexts/NotificationContext';

export default function AuctionList({ location }) {
  const [auctions, setAuctions] = useState({});
  const [auctionBlacklist, setAuctionBlacklist] = useState({});
  const [favorites, setFavorites] = useState([]);

  const { addMessage } = useNotification();

  useEffect(() => {
    axios.get(`https://www.bidrl.com/api/landingPage/${location.url}`).then(async (res) => {
      console.log(res.data);

      const auctionIds = Object.values(res.data.auctions).map((auction) => auction.id);

      // remove old auctions from blacklist
      const blacklist = JSON.parse(await AsyncStorage.getItem(StorageKeys.itemBlacklistKey));
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
      }
      await AsyncStorage.setItem(StorageKeys.itemBlacklistKey, JSON.stringify(blacklist));

      setAuctionBlacklist(JSON.parse(await AsyncStorage.getItem(StorageKeys.auctionBlacklistKey)));

      setAuctions(res.data.auctions);

      const fetchedFavorites = JSON.parse(await AsyncStorage.getItem(StorageKeys.favoritesKey));
      setFavorites(fetchedFavorites == null ? [] : fetchedFavorites[location.id]);
    });
  }, []);

  const updateBlacklist = useCallback(async (id, add) => {
    let blacklist = JSON.parse(await AsyncStorage.getItem(StorageKeys.auctionBlacklistKey));
    // initialize blacklist object
    if (blacklist == null) {
      blacklist = {};
    }
    // initialize blacklist object for location
    if (blacklist[location.id] === undefined) {
      blacklist[location.id] = [];
    }
    blacklist[location.id] = blacklist[location.id].filter((i) => i !== id);
    if (add) {
      blacklist[location.id].push(id);
    }
    await AsyncStorage.setItem(StorageKeys.auctionBlacklistKey, JSON.stringify(blacklist));
    setAuctionBlacklist(blacklist);
  }, [auctionBlacklist]);

  const updateFavorites = useCallback(async (id, add) => {
    console.log(`Adding ${id} to favorites...`);

    addMessage(`Adding ${id} to favorites...`);

    let favoriteList = JSON.parse(await AsyncStorage.getItem(StorageKeys.favoritesKey));
    // initialize blacklist object
    if (favoriteList == null) {
      favoriteList = {};
    }
    // initialize blacklist object for location
    if (favoriteList[location.id] === undefined) {
      favoriteList[location.id] = [];
    }
    favoriteList[location.id] = favoriteList[location.id].filter((i) => i !== id);
    if (add) {
      favoriteList[location.id].push(id);
    }
    await AsyncStorage.setItem(StorageKeys.favoritesKey, JSON.stringify(favoriteList));
    setFavorites(favoriteList[location.id]);
  }, [favorites]);

  const callUpdateFavorites = useCallback((id, add) => updateFavorites(id, add), []);

  const auctionList = Object.values(auctions);
  const auctionsToShow = auctionBlacklist != null && auctionBlacklist[location.id] !== undefined
    ? auctionList.filter((auction) => !auctionBlacklist[location.id].includes(auction.id))
    : auctionList;

  return (
    <View>
      <Favorites
        favorites={favorites == null ? [] : favorites}
        updateFavorites={callUpdateFavorites}
      />
      {auctionsToShow.map((auction) => (
        <Auction
          auction={auction}
          location={location}
          updateBlacklist={updateBlacklist}
          updateFavorites={callUpdateFavorites}
          key={auction.id}
        />
      ))}
    </View>
  );
}

AuctionList.propTypes = {
  location: shape({ url: string }).isRequired,
};
