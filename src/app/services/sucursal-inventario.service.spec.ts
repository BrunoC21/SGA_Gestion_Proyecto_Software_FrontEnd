import { TestBed } from '@angular/core/testing';

import { SucursalInventarioService } from './sucursal-inventario.service';

describe('SucursalInventarioService', () => {
  let service: SucursalInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucursalInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
