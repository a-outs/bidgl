import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { string } from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <LocationSelection />
    </View>
  );
}

const affiliateListKey = 'affiliate-list';

function LocationSelection() {
  const [affiliateList, updateAffiliateList] = useState([]);
  const [checkedAffiliates, updateCheckedAffiliates] = useState([]);

  const locationChecked = (affiliate, checked) => {
    if (checked) {
      updateCheckedAffiliates((l) => [...l, affiliate]);
    } else {
      updateCheckedAffiliates((l) => l.filter((a) => a !== affiliate));
    }
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

        // construct react components
        affiliateResponse.forEach((affiliate) => {
          affiliates.push(
            <Location
              key={affiliate.id}
              location={affiliate.name}
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
          <Text
            style={{ textAlign: 'center' }}
            key={affiliate}
          >
            {affiliate}
          </Text>
        ))}
      </View>
    </View>
  );
}

function Location({ location, onLocationCheck }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const state = !checked;
    setChecked(state);
    onLocationCheck(location, state);
  };

  return (
    <View style={{ backgroundColor: checked ? 'gray' : 'white' }}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        {location}
      </label>
    </View>
  );
}

Location.propTypes = {
  location: string,
};

Location.defaultProps = {
  location: 'All',
};

const Auctions = (props) => {
  axios.get(`https://www.bidrl.com/api/landingPage/${props.location}`).then((res) => {

  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  affiliateListStyle: {
    flexDirection: 'row',
  },
});
