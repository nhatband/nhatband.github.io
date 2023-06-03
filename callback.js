const request = require('request');

const domainName = 'nhatband.github.io';
const callbackUrl = 'https://nhatband.github.io/callback';

const apiUrl = `https://api.name.com/v4/domains/${domainName}`;
const headers = {
    'Authorization': '398735144457400578',
    'Content-Type': 'application/json'
};

// Get current domain info
request.get({
    url: apiUrl,
    headers: headers
}, (error, response, body) => {
    if (error) {
        console.error(error);
        return;
    }
    
    const domainInfo = JSON.parse(body);
    
    // Add callback url to domain info
    domainInfo.callbackUrl = callbackUrl;
    
    // Update domain info
    request.put({
        url: apiUrl,
        headers: headers,
        body: JSON.stringify(domainInfo)
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log(`Callback URL "${callbackUrl}" added to "${domainName}".`);
    });
});