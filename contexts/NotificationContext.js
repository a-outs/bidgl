import { arrayOf, shape } from 'prop-types';
import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

export const NotificationContext = createContext({
  message: null,
  addMessage: () => { },
  removeMessage: () => { },
});

export default function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);

  const removeMessage = () => setMessage(null);

  const addMessage = (m) => setMessage(m);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotificationContext.Provider value={{
      message,
      addMessage: useCallback((m) => addMessage(m), []),
      removeMessage: useCallback(() => removeMessage(), []),
    }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: arrayOf(shape({})).isRequired,
};

export const useNotification = () => {
  const { message, addMessage, removeMessage } = useContext(NotificationContext);
  return { message, addMessage, removeMessage };
};
