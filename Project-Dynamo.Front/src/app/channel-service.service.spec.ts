import { TestBed, inject } from '@angular/core/testing';

import { ChannelServiceService } from './channel-service.service';

describe('ChannelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelServiceService]
    });
  });

  it('should be created', inject([ChannelServiceService], (service: ChannelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
