import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityStoriesComponent } from './community-stories.component';

describe('CommunityStoriesComponent', () => {
  let component: CommunityStoriesComponent;
  let fixture: ComponentFixture<CommunityStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
