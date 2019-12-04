import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProductMenuDialogComponent } from './save-product-menu-dialog.component';

describe('SaveProductMenuDialogComponent', () => {
  let component: SaveProductMenuDialogComponent;
  let fixture: ComponentFixture<SaveProductMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProductMenuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProductMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
