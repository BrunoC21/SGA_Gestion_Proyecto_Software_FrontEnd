import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBodegaComponent } from './gestion-bodega.component';

describe('GestionBodegaComponent', () => {
  let component: GestionBodegaComponent;
  let fixture: ComponentFixture<GestionBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBodegaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
