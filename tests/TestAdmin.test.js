const testStateDefinition = require('../express-server/testdefinitions/TestSitesStatusObj.json');
const TestStateHandler = require('../express-server/src/TestStateHandler').TestStateHandler;

test('Verify that test state handler is singleton', () => {
    const singleton1 = TestStateHandler.getInstance(testStateDefinition);
    const singleton2 = TestStateHandler.getInstance(testStateDefinition);
    expect(singleton1).toBe(singleton2);
});

test('Verify that you get a list of the testsites', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    const sites = handler.getAllSites();
    expect(sites.length).toBe(2);
});

test('Verify that you can get the test-definitions based on name', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    const site = handler.getSiteByName('Kirkegården');
    expect(site.name).toBe('Kirkegården');
});

test('Verify that you can get the test-definitions based on if', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    const site = handler.getSiteById(1);
    expect(site.id).toBe(1);
});

test('Verify that test is not started if start time and end time is null', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    expect(handler.isTestRunning(1,1)).toBe(false);
});

test('Verify that started is set when startTest is set', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    const site = handler.getSiteById(1);
    handler.startRunningTest(site.name, 1);
    expect(handler.isTestRunning(1,1)).toBe(true);
});

test('Verify that when you end a test testEnded will return true', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    const site = handler.getSiteById(2);
    handler.startRunningTest(site.name, 2);
    handler.stopRunningTest(site.name, 2);
    expect(handler.isTestEnded(2,2)).toBe(true);
});

test('Verify that test is not started if start time and end time is null', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    handler.resetAllTests();
    expect(handler.isTestRunning(1,1)).toBe(false);
});

test('Verify that you cannot end a test that has not beed starte', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    handler.resetAllTests();
    const site = handler.getSiteById(2);
    handler.stopRunningTest(site.name, 1);
    expect(handler.isTestEnded(1,3)).toBe(false);
});

test('Verify that you get the correct elapsed time for a test', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    handler.resetAllTests();
    const site = handler.getSiteById(2);
    handler.startRunningTest(site.name, 3);

    const now = new Date()
    expect(handler.calculateElapsedTime(2,3, new Date((now.getTime() + 500)))).toBeGreaterThan(450);
    handler.stopRunningTest(site.name, 3);
});

test('Verify that if a test is already running, you get the correct test', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    handler.resetAllTests();
    const site = handler.getSiteById(1);
    handler.startRunningTest(site.name, 3);
    const runningTest = handler.getRunningTestOnSite(1);
    expect(runningTest.testid).toBe(3);
});

test('Verify that if no tests are running, you get no test', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    handler.resetAllTests();
    const runningTest = handler.getRunningTestOnSite(1);
    expect(runningTest).toBe(null);
});