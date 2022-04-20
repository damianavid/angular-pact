import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HelloWorldService } from './hello-world.service';

describe('HelloWorldService', () => {
  let service: HelloWorldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HelloWorldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it("should retrieve data", () => {
  //   expect(service.helloWorld).toBeCalled();
  // })
});
