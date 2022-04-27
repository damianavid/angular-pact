import '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { pactWith } from 'jest-pact';

import { HelloWorldService } from './hello-world.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { Matchers } from '@pact-foundation/pact';

pactWith({
    consumer: 'angular-plain-2',
    provider: 'HellowWorldService'}, provider => {
    let service: HelloWorldService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [HelloWorldService, HttpTestingController],
        });
        service = TestBed.inject(HelloWorldService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    describe('Welcome to api', () => {
        beforeEach(() => provider.addInteraction({
            state: 'server is healthy',
            uponReceiving: 'A request for API',
            willRespondWith: {
                status: 200,
                body: {
                    message: Matchers.like('Welcome to api!')
                },
            },
            withRequest: {
                method: 'GET',
                path: '/hello'
            }
        }));

        it('returns Welcome to api!', (done) => {
            service.helloWorld(provider.mockService.baseUrl).subscribe((res) => {
            console.log("res", res);  
            expect(res).toEqual({
                message: 'Welcome to api!'
            })
            done();
            });
        })
    });
})
