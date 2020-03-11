// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;

global.port = 8888;
global.provider = new Pact({
    cors: true,
    port: global.port,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    loglevel: 'debug',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    pactfileWriteMode: 'update',
    consumer: 'user-consumer',
    provider: 'user-provider',
    host: '127.0.0.1'
});

beforeAll((done) => {
    global.provider.setup().then(() => done());
});

afterAll((done) => {
    global.provider.finalize().then(() => done());
});
