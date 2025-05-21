const fetch = require('node-fetch');

const MEASUREMENT_ID = 'G-S29P38NBPR';
const API_SECRET = 'DUnNSPH8Sy-dK2QowzykwA';

const sendAnalyticsEvent = async (clientId, eventName, params = {}) => {
  const payload = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params
      }
    ]
  };

  try {
    const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log('GA response:', text);
  } catch (error) {
    console.error('Error sending analytics event:', error);
  }
};

module.exports = { sendAnalyticsEvent };
