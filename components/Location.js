import { arrayOf, func, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

export default function Location({ location, onLocationCheck, checkedAffiliates }) {
  const checked = checkedAffiliates.some((a) => a.id === location.id);

  const handleChange = () => {
    const state = !checked;
    onLocationCheck(location, state);
  };

  return (
    <View style={{ backgroundColor: checked ? 'gray' : 'white' }}>
      <label htmlFor={location.url}>
        <input
          type="checkbox"
          checked={checkedAffiliates.some((a) => a.id === location.id)}
          onChange={handleChange}
          id={location.url}
          style={{ display: 'none' }}
        />
        <Text>{location.name}</Text>
      </label>
    </View>
  );
}

Location.propTypes = {
  location: shape({}).isRequired,
  onLocationCheck: func.isRequired,
  checkedAffiliates: arrayOf(shape({})).isRequired,
};
