import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

interface Data {
  message: string;
}

const MyComponent: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    apiClient.get('/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default MyComponent;
