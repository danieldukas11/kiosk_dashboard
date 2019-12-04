import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveIngredientMenuDialogComponent } from './save-ingredient-menu-dialog.component';

describe('SaveIngredientMenuDialogComponent', () => {
  let component: SaveIngredientMenuDialogComponent;
  let fixture: ComponentFixture<SaveIngredientMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveIngredientMenuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveIngredientMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
