// Function to create a chat session
async function createChatSession(apiKey, externalUserId) {
    const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        pluginIds: [],
        externalUserId: externalUserId
      })
    });
  
    const data = await response.json();
    return data.data.id; // Extract session ID
  }
  
  // Function to submit a query using the session ID
  async function submitQuery(apiKey, sessionId, query) {
    const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        endpointId: 'predefined-openai-gpt4o',
        query: query,
        pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
        responseMode: 'sync'
      })
    });
    const data = await response.json();
    return data;
  }
  
  // Example usage
  (async () => {
    const apiKey = '<replace_api_key>';
    const externalUserId = '<replace_external_user_id>';
    const query = 'Put your query here';
  
    try {
      const sessionId = await createChatSession(apiKey, externalUserId);
      const response = await submitQuery(apiKey, sessionId, query);
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  