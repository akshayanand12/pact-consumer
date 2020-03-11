import UserService from './user.service';
import * as Pact from '@pact-foundation/pact';
import User from '../User'

describe('UserService API', () => {

    const userService = new UserService('http://localhost', global.port);

    // a matcher for the content type "application/json" in UTF8 charset
    // that ignores the spaces between the ";2 and "charset"
    const contentTypeJsonMatcher = Pact.Matchers.term({
        matcher: "application\\/json; *charset=utf-8",
        generate: "application/json; charset=utf-8"
    });

    describe('getUser()', () => {

        beforeEach((done) => {
            global.provider.addInteraction({
                state: 'a user exists',
                uponReceiving: 'a GET request for a user',
                withRequest: {
                    method: 'GET',
                    path: '/users/1',
                    headers: {
                        'Accept': contentTypeJsonMatcher
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': contentTypeJsonMatcher
                    },
                    body: Pact.Matchers.somethingLike(new User(1, 'Adam', '2020-03-11T14:40:44.374+0000'))
                }
            }).then(() => done());
        });

        it('sends a request according to contract', (done) => {
            userService.getUser(1)
                .then(user => {
                    expect(user.name).toEqual('Adam');
                })
                .then(() => {
                    global.provider.verify()
                        .then(() => done(), error => {
                            done.fail(error)
                        })
                });
        });
    });
});