import { Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import axios, { toFormData } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuctionItem from './AuctionItem';
import StorageKeys from '../StorageKeys';

export default function Auction({ auction }) {
  const [items, setItems] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [itemBlacklist, setItemBlacklist] = useState([]);

  useEffect(() => {
    const checkAndFetchItems = async () => {
      // fetch from API
      axios.post('https://www.bidrl.com/api/getitems', toFormData({
        auction_id: auction.id,
        'filters[perpage]': '999',
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
    };
    checkAndFetchItems();
  }, []);

  const updateBlacklist = async (id, add) => {
    let blacklist = JSON.parse(await AsyncStorage.getItem(StorageKeys.itemBlacklistKey));
    if (blacklist == null) {
      blacklist = [];
    }
    blacklist = blacklist.filter((i) => i !== id);
    if (add) {
      blacklist.push(id);
    }
    await AsyncStorage.setItem(StorageKeys.itemBlacklistKey, JSON.stringify(blacklist));
    setItemBlacklist(blacklist);
  };

  const filteredItems = items !== null
    ? items.items.filter((item) => itemBlacklist.every((i) => i !== item.id))
    : [];

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
};
