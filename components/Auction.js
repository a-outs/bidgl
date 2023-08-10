import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import axios, { toFormData } from 'axios';
import AuctionItem from './AuctionItem';

export default function Auction({ auction }) {
  const [items, setItems] = useState(null);

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

  return (
    <View>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>
        {auction.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {items !== null ? items.items.map((item) => <AuctionItem key={item.id} item={item} />) : 'Loading...'}
      </View>
    </View>
  );
}

Auction.propTypes = {
  auction: shape({
    title: string,
  }).isRequired,
};
