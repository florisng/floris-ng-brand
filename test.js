let chai = require('chai');
let server = require('./index');
let chaiHttp = require("chai-http");

// Assertion style
chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
    const users_routes = require('./routes/users');
    /* Test the /GET route */
    describe("/GET user", () => {
        it('It should GET all the users', (done) => {
            chai.request(server)
                .get('/routes/users')
                .end((err, res) => {
                    res.should.have.status(200);
                });
            setTimeout(done, 300);
        });
    });
});