'use strict'

const request = require('supertest'),
    app = require('../'),
    mongoose = require('mongoose'),
    User = require('../models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL_TEST, { useUnifiedTopology: true, useNewUrlParser: true });
})

afterAll(() => {
    mongoose.connection.close();
})

describe('Testing user enpoints', () => {
    describe('GET /users/sign-up', () => {
        let response;
        beforeEach(async () => {
            response = await request(app).get('/users/sign-up');
        })

        it('should response with a status 200 because of we are rendering the right template', () => {
            expect(response.statusCode).toBe(200);
        })

        // it('should response with a status 500 because of we are not rendering a righ template', () => {
        //     expect(response.statusCode).toBe(500);
        // })
    });

    describe('POST /users/sign-up', () => {
        afterEach(async () => {
            await User.deleteMany();
        })

        it('should response with a status 200 because of we are sending the valid data', async () => {
            const data = {
                name: 'Haissan',
                email: 'hasiss@gmail.com',
                password: 'jdjshdh82732_92-'
            };
            await request(app)
                .post('/users/sign-up')
                .send(data)
                .expect(302);
        })
    })
});