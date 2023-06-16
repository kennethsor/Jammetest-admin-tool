const _ = require('underscore');

const TestStateHandler = (() => {
    var instance;

    const Singleton = definitions => {
        const _definitions = definitions;

        const getAllSites = () => {
            console.log(_definitions);
            var sites = [];
            _.each(_definitions.testSites, site => {
                sites.push(site.name);
            });
            return sites;
        };

        const getSiteByName = name => {
            return _.filter(_definitions.testSites, site => {
                return site.name === name;
            })[0];
        };

        const getSiteById = id => {
            return _.filter(_definitions.testSites, site => {
                return site.id === id;
            })[0];
        };

        const isTestRunning = (siteId, testId) => {
            const test = getTest(siteId, testId);
            return (test.started != null && test.ended == null) ? true : false;
        }

        const isTestEnded = (siteId, testId) => {
            const test = getTest(siteId, testId);
            return (test.started != null && test.ended != null) ? true : false;
        }

        const getTest = (siteId, testId) => {
            return _.filter(getSiteById(siteId).tests, test => {
                return test.id === testId;
            })[0];
        }

        const startTest = (siteId, testId) => {
            const siteArId = _definitions.testSites.indexOf(getSiteById(siteId));
            const testArId = _definitions.testSites[siteArId].tests.indexOf(getTest(siteId, testId));

            _definitions.testSites[siteArId].tests[testArId].started = new Date();
        }

        const endTest = (siteId, testId) => {
            if (isTestRunning(siteId, testId)) {
                const siteArId = _definitions.testSites.indexOf(getSiteById(siteId));
                const testArId = _definitions.testSites[siteArId].tests.indexOf(getTest(siteId, testId));

                _definitions.testSites[siteArId].tests[testArId].ended = new Date();
            }
        }

        const calculateElapsedTime = (siteId, testId, now) => {
            return now.getTime() - (getTest(siteId, testId).started).getTime();
        }

        return {
            getAllSites: getAllSites,
            getSiteByName: getSiteByName,
            getSiteById: getSiteById,
            isTestRunning: isTestRunning,
            isTestEnded: isTestEnded,
            startTest: startTest,
            endTest: endTest,
            calculateElapsedTime: calculateElapsedTime
        };
    }

    return {
        getInstance: definitions => {
            if (!instance) {
                instance = Singleton(definitions);
            }
            return instance;
        }
    }
})()

module.exports.TestStateHandler = TestStateHandler;
