const _ = require('underscore');

const TestStateHandler = (() => {
    var instance;
    var runningTests = [];

    const Singleton = definitions => {
        const _definitions = definitions;

        const getAllSites = () => {
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

        const startRunningTest = (sitename, testid,) => {
            const site = getSiteByName(sitename);
            console.log('... starting test ' + site.tests[testid].name + ' on test ' + sitename);

            // make sure that only one test per site is running
            if(!checkIfTestOnSiteIsAlreadyRunning(site.id)) {
                runningTests.push({siteid: site.id, testid: testid});
                startTest(site.id, testid);

                return false;
            }
            else {
                return true;
            }
        }

        const checkIfTestOnSiteIsAlreadyRunning = (siteId) => {
            if (runningTests.length === 0) {
                return false;
            }
            else {
                const test = _.filter(runningTests, element => {
                    return element.siteid === siteId;
                });

                return test.length === 0 ? false : true;
            }
        }

        const getRunningTestOnSite = (siteId) => {
            const test = _.filter(runningTests, element => {
                return element.siteid === siteId;
            });

            return test.length != 0 ? test[0] : null;
        }

        const stopRunningTest = (sitename, testId) => {
            // make sure that the test is running
            const site = getSiteByName(sitename);

            if(checkIfTestOnSiteIsAlreadyRunning(site.id)) {
                const test = _.filter(runningTests, element => {
                    return element.siteid === site.id;
                })[0];
                runningTests = _.filter(runningTests, t => {
                    return t.siteid != test.siteid && t.testid != test.testid;
                });

                endTest(site.id, testId);

                return false;
            }
            else {
                return true;
            }
        }

        const resetAllTests = () => {
            for(var i = 0; i < _definitions.testSites.length; i++) {
                for(var j = 0; j < _definitions.testSites[i].tests.length; j++) {
                    _definitions.testSites[i].tests[j].started = null;
                    _definitions.testSites[i].tests[j].ended = null;
                }
            }
            runningTests = [];
        }

        return {
            getAllSites: getAllSites,
            getSiteByName: getSiteByName,
            getSiteById: getSiteById,
            isTestRunning: isTestRunning,
            isTestEnded: isTestEnded,
            calculateElapsedTime: calculateElapsedTime,
            startRunningTest: startRunningTest,
            stopRunningTest: stopRunningTest,
            getTest: getTest,
            getRunningTestOnSite: getRunningTestOnSite,
            resetAllTests: resetAllTests,
            getAllDefinitions: () => {return _definitions}
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