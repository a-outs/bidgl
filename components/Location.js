import { arrayOf, func, shape } from 'prop-types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Location({ location, onLocationCheck, checkedAffiliates }) {
  const checked = checkedAffiliates.some((a) => a.id === location.id);

  const handleChange = () => {
    const state = !checked;
    onLocationCheck(location, state);
  };

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
        ]}
        onPress={handleChange}
      >
        <Text style={{ color: checked ? 'red' : 'black' }}>{location.name}</Text>
      </Pressable>
    </View>
  );
}

Location.propTypes = {
  location: shape({}).isRequired,
  onLocationCheck: func.isRequired,
  checkedAffiliates: arrayOf(shape({})).isRequired,
};
