import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HistorialComponent } from './historial.component'
import { TestingHelper } from 'src/helpers/testing.helper'
import { AppComponent } from '../app.component'

describe('HistorialComponent', () => {
  let component: HistorialComponent
  let fixture: ComponentFixture<HistorialComponent>
  let test: TestingHelper<HistorialComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialComponent, AppComponent]
    })
    fixture = TestBed.createComponent(HistorialComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    test = TestingHelper.createHelper(fixture, 'es')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Inicialmente no deberia haber ninguna conversion guardada', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr')
    expect(rows.length).toEqual(0)
  })

  it('Al clickear en el boton guardar se deberia reflejar en la lista', () => {
    // Reto: Obtener el boton de guardar del componente app o testear en el componente app esto obteniendo la tabla de este componente
  })

  it('Se borra un elemento de la lista', () => {
    // Reto: Obtener el boton de borrar del elemento especifico que se quiere borrar.
  })
})
