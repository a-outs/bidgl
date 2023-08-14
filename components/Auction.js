import { Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import axios, { toFormData } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuctionItem from './AuctionItem';
import StorageKeys from '../StorageKeys';

export default function Auction({ auction, location }) {
  const [items, setItems] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [itemBlacklist, setItemBlacklist] = useState([]);

  useEffect(() => {
    const checkAndFetchItems = async () => {
      // fetch from API
      axios.post('https://www.bidrl.com/api/getitems', toFormData({
        auction_id: auction.id,
        'filters[perpage]': auction.item_count,
        item_type: 'itemlist',
        lotnum: '',
        seqnum: '',
        close_groups: '',
        show_closed: 'closeed',
        perpetual: '',
      })).then((res) => {
        console.log(res.data);
        setItems(res.data);
      });
      const blacklist = JSON.parse(await AsyncStorage.getItem(StorageKeys.itemBlacklistKey));
      setItemBlacklist(blacklist);
    };
    checkAndFetchItems();
  }, []);

  const updateBlacklist = async (id, add) => {
    let blacklist = JSON.parse(await AsyncStorage.getItem(StorageKeys.itemBlacklistKey));
    // initialize blacklist object
    if (blacklist == null) {
      blacklist = {};
    }
    // initialize blacklist object for location
    if (blacklist[location.id] === undefined) {
      blacklist[location.id] = {};
    }
    // initialize blacklist list for this auction
    if (blacklist[location.id][auction.id] === undefined) {
      blacklist[location.id][auction.id] = [];
    }
    blacklist[location.id][auction.id] = blacklist[location.id][auction.id].filter((i) => i !== id);
    if (add) {
      blacklist[location.id][auction.id].push(id);
    }
    await AsyncStorage.setItem(StorageKeys.itemBlacklistKey, JSON.stringify(blacklist));
    setItemBlacklist(blacklist);
  };

  let filteredItems = [];

  if (items !== null) {
    filteredItems = itemBlacklist[location.id] === undefined
      || itemBlacklist[location.id][auction.id] === undefined
      ? items.items
      : items.items.filter(
        (item) => itemBlacklist[location.id][auction.id].every((i) => i !== item.id),
      );
  }

  return (
    <View>
      <Pressable onPress={() => setShowImages(!showImages)}>
        <Text>{showImages ? 'hide images' : 'show images'}</Text>
      </Pressable>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>
        {auction.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {filteredItems.length > 0 ? filteredItems.map(
          (item) => (
            <AuctionItem
              key={item.id}
              item={item}
              showImage={showImages}
              updateBlacklist={updateBlacklist}
            />
          ),
        )
          : <Text>Loading...</Text>}
      </View>
    </View>
  );
}

Auction.propTypes = {
  auction: shape({
    title: string,
  }).isRequired,
  location: shape({
    id: string,
  }).isRequired,
};
