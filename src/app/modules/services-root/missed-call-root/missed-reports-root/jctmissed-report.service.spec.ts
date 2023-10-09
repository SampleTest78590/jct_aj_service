import { TestBed } from '@angular/core/testing';

import { JctmissedReportService } from './jctmissed-report.service';

describe('JctmissedReportService', () => {
  let service: JctmissedReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JctmissedReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
