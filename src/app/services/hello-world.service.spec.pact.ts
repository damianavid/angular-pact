import '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Matchers, Pact } from '@pact-foundation/pact';
import { pactWith } from 'jest-pact';

import * as path from 'path';
import { HelloWorldService } from './hello-world.service';

pactWith({
    consumer: 'angular-plain-2',
    provider: 'HellowWorldService'}, provider => {
    let service: HelloWorldService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [HelloWorldService],
        });
        service = TestBed.inject(HelloWorldService)
    });

    describe('hello world', () => {
        beforeEach(() => provider.addInteraction({
            state: 'server is healthy',
            uponReceiving: 'A request for API hello world',
            willRespondWith: {
                status: 200,
                body: {
                    status: Matchers.like('Welcome to api!')
                },
            },
            withRequest: {
                method: 'GET',
                path: '/hello'
            }
        }));

        it('returns hello world', async () => 
            service.helloWorld().subscribe(res => {
                console.log("response", res);
                expect(res).toBe("random");
            })
        )
    });
})

// describe('User Service Pact', () => {
//     let service: HelloWorldService;
//     let expectedRes: any = {
//         message: "Welcome to api!"
//     };
//     beforeEach(() => {
//     TestBed.configureTestingModule({
//         imports: [HttpClientModule],
//         providers: [HelloWorldService],
//     });
//     service = TestBed.inject(HelloWorldService)
//     });
    
//     const provider: Pact = new Pact({
//         port: 8181,
//         log: path.resolve(process.cwd(), 'pact', 'logs', 'mockserver-integration.log'),
//         dir: path.resolve(process.cwd(), 'pacts'),
//         spec: 3,
//         logLevel: 'info',
//         consumer: 'angular-plain-2',
//         provider: 'helloworldservice',
//         cors: true
//       });

//     beforeAll(async () => {
//         await provider.setup();
//     });

//     afterEach(async () => {
//         await provider.verify();
//     });

//     afterAll(async () => {
//         await provider.finalize();
//     });

//     describe('getData()', () => {
        

//         beforeAll(async () => {
//             await provider.addInteraction({
//                 state: `response exists`,
//                 uponReceiving: 'a request to GET a response',
//                 withRequest: {
//                     method: 'GET',
//                     path: `/hello`,
//                 },
//                 willRespondWith: {
//                     status: 200,
//                     body: Matchers.somethingLike(expectedRes)
//                 },
//             });
//         });

//         it('should get a response', async () => {
//             service.helloWorld().subscribe(res => {
//                 console.log("response", res);
//                 expect(res).toHaveReturned()
//             })
//         });
//     });
// });