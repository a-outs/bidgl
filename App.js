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
      <ViewLocations />
    </View>
  );
}

const affiliateListKey = 'affiliate-list';

function ViewLocations() {
  const [affiliateList, updateAffiliateList] = useState([]);

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
          affiliates.push(<Location key={affiliate.id} location={affiliate.name} />);
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
        flexDirection: 'row',
        height: 100,
        padding: 20,
      }}
    >
      <View style={{ backgroundColor: 'blue', flex: 0.3 }} />
      <View style={{ backgroundColor: 'red', flex: 0.5 }} />
      <Text>Hello World!</Text>
      <ul>{affiliateLi}</ul>
    </View>
  );
}

function Location({ location }) {
  return (
    <li>
      {location}
    </li>
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
});
