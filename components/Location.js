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
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        {location.name}
      </label>
    </View>
  );
}

Location.propTypes = {
};

Location.defaultProps = {
  location: {},
};
