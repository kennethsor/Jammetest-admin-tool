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
    handler.startTest(1,1);
    expect(handler.isTestRunning(1,1)).toBe(true);
});

test('Verify that test is not started if start time and end time is null', () => {
    testStateDefinition.testSites[0].tests[0].started = (new Date()).toISOString();
    const handler = TestStateHandler.getInstance(testStateDefinition);
    expect(handler.isTestRunning(1,1)).toBe(true);
});

test('Verify that when you end a test testEnded will return true', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    handler.startTest(2,2);
    handler.endTest(2,2);
    expect(handler.isTestEnded(2,2)).toBe(true);
});

test('Verify that you cannot end a test that has not beed starte', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    handler.endTest(1,2);
    expect(handler.isTestEnded(1,2)).toBe(false);
});

test('Verify that you get the correct elapsed time for a test', () => {
    const handler = TestStateHandler.getInstance(testStateDefinition);
    handler.startTest(1,4);
    setTimeout(() => {
        handler.endTest(1,4);
        expect(handler.calculateElapsedTime(1,4, (new Date()))).toBeGreaterThan(450);
    },500);
});