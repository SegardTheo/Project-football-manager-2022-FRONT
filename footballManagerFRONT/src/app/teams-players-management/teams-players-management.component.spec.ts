import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsPlayersManagementComponent } from './teams-players-management.component';

describe('TeamsPlayersManagementComponent', () => {
  let component: TeamsPlayersManagementComponent;
  let fixture: ComponentFixture<TeamsPlayersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsPlayersManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsPlayersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
