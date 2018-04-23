import { TestBed, inject } from '@angular/core/testing';

import { TeacherService } from './teachers.service';

describe('TeachersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherService]
    });
  });

  it('should be created', inject([TeacherService], (service: TeacherService) => {
    expect(service).toBeTruthy();
  }));
});
