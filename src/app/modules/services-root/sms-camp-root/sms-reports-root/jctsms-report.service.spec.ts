import { TestBed } from '@angular/core/testing';

import { JctsmsReportService } from './jctsms-report.service';

describe('JctsmsReportService', () => {
  let service: JctsmsReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JctsmsReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
