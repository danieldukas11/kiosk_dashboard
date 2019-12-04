import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveIngredientDialogComponent } from './save-ingredient-dialog.component';

describe('SaveIngredientDialogComponent', () => {
  let component: SaveIngredientDialogComponent;
  let fixture: ComponentFixture<SaveIngredientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveIngredientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
