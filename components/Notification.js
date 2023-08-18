import React, { Text, View } from 'react-native';
import { useNotification } from '../contexts/NotificationContext';

export default function Notification() {
  const { message, removeMessage } = useNotification();

  console.log(`Message of: ${message}`);

  const dismiss = async () => {
    console.log('dismissing notif...');
    removeMessage();
  };

  if (message) { setTimeout(dismiss, 3000); }

  return (
    <View style={{ width: '100', height: '100' }}>
      <Text style={{ position: 'fixed' }}>{message || ''}</Text>
    </View>
  );
}
