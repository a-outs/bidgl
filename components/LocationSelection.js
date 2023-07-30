import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';
import Location from './Location';
import SelectedLocation from './SelectedLocation';
import styles from '../AppStyles';

const affiliateListKey = 'affiliate-list';
const selectedLocationsKey = 'selected-locations';

export default function LocationSelection() {
  const [affiliateList, updateAffiliateList] = useState([]);
  const [checkedAffiliates, updateCheckedAffiliates] = useState([]);

  // callback for when a location is checked or uncheckd
  const locationChecked = (affiliate, checked) => {
    const updateAndStoreList = (list, item, add) => {
      let output = list;
      if (add) {
        if (list.every((a) => a.id !== item.id)) {
          output = [...list, item];
        }
      } else {
        output = list.filter((a) => a.id !== item.id);
      }
      AsyncStorage.setItem(selectedLocationsKey, JSON.stringify(output));
      return output;
    };
    updateCheckedAffiliates((l) => updateAndStoreList(l, affiliate, checked));
  };

  useEffect(() => {
    const fetchAffiliates = async () => {
      // check local storage first
      try {
        const affiliates = [];
        let affiliateResponse;

        const jsonValue = await AsyncStorage.getItem(affiliateListKey);
        if (jsonValue != null) {
          affiliateResponse = JSON.parse(jsonValue);
          console.log('Found affiliates in data store:');
          console.log(affiliateResponse);
        } else {
          // now fetch from API
          await axios.get('https://www.bidrl.com/api/auctionfields').then((res) => {
            affiliateResponse = res.data.affiliates.model;
            // push into data store
            AsyncStorage.setItem(affiliateListKey, JSON.stringify(affiliateResponse));
          });
        }

        affiliateResponse = affiliateResponse.sort((a, b) => a.name > b.name);

        // construct react components
        affiliateResponse.forEach((affiliate) => {
          affiliates.push(
            <Location
              key={affiliate.id}
              location={affiliate}
              onLocationCheck={locationChecked}
            />,
          );
        });
        updateAffiliateList(affiliates);
      } catch (e) {
        // error reading value
        console.error(e);
      }
    };
    fetchAffiliates();

    const fetchStoredCheckedAffiliates = async () => {
      const storedCheckedAffiliates = JSON.parse(await AsyncStorage.getItem(selectedLocationsKey));
      if (storedCheckedAffiliates !== null) {
        updateCheckedAffiliates(storedCheckedAffiliates);
      }
    };
    fetchStoredCheckedAffiliates();
  }, []);

  const affiliateLi = affiliateList.length > 0 ? affiliateList : <li> Loading... </li>;

  return (
    <View
      style={{
        height: 100,
        padding: 20,
      }}
    >
      <Text>Hello World!</Text>
      <View style={styles.affiliateListStyle}>{affiliateLi}</View>
      <View>
        {checkedAffiliates.map((affiliate) => (
          <SelectedLocation
            key={affiliate.id}
            location={affiliate}
          />
        ))}
      </View>
    </View>
  );
}
