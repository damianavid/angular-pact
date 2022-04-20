import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs';

import { HelloWorldService } from './hello-world.service';

describe('HelloWorldService', () => {
  let service: HelloWorldService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HelloWorldService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve hello world", () => {
    const expectedResult = {
      message: "Welcome to api!"
    };

    service.helloWorld().subscribe((res) => {
      expect(res).toEqual(expectedResult)
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: 'http://localhost:3333/api/hello'
    });

    req.flush(1);
  })
});
