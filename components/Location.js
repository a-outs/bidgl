import { func, shape } from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function Location({ location, onLocationCheck }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const state = !checked;
    setChecked(state);
    onLocationCheck(location, state);
  };

  return (
    <View style={{ backgroundColor: checked ? 'gray' : 'white' }}>
      <label htmlFor={location.url}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          id={location.url}
        />
        {location.name}
      </label>
    </View>
  );
}

Location.propTypes = {
  location: shape({}).isRequired,
  onLocationCheck: func.isRequired,
};
