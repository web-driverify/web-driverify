// spec: https://www.w3.org/TR/webdriver/#capabilities
var capabilities = {
    browserName: 'Any Browser by Web Driverify',
    browserVersion: 'any',
    platformName: 'any',
    acceptInsecureCerts: 'true',
    pageLoadStrategy: 'normal',
    proxy: {
        proxyType: 'system',
        proxyAutoconfigUrl: '',
        ftpProxy: '',
        ftpProxyPort: '',
        httpProxy: '',
        httpProxyPort: '',
        sslProxy: '',
        sslProxyPort: '',
        socksProxy: '',
        socksProxyPort: '',
        socksVersion: '',
        socksUsername: '',
        socksPassword: ''
    },
    timeouts: {
        implicit: 60,
        "page load": 60,
        script: 60
    },
    unhandledPromptBehavior: 'none'
};

module.exports = capabilities;
