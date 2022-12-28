import { useState } from 'react';

export default function useToken (token) {
  const [uniqueToken, setUniqueToken] = useState('');
  setUniqueToken(token);
  return [uniqueToken, setUniqueToken];
};
