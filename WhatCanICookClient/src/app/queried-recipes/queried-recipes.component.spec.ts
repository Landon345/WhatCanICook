import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriedRecipesComponent } from './queried-recipes.component';

describe('QueriedRecipesComponent', () => {
  let component: QueriedRecipesComponent;
  let fixture: ComponentFixture<QueriedRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueriedRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
