import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployedsComponent } from './create-employeds.component';

describe('CreateEmployedsComponent', () => {
  let component: CreateEmployedsComponent;
  let fixture: ComponentFixture<CreateEmployedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmployedsComponent]
    });
    fixture = TestBed.createComponent(CreateEmployedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
