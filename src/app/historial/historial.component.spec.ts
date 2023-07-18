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

  it('Crea el componente correctamente', () => {
    expect(component).toBeTruthy()
  })

  it('Inicialmente no deberia haber ninguna conversion guardada', () => {
    expect(cantidadFilas()).toEqual(0)
  })

  it('Al obtener valores en la lista de conversiones se deberian reflejar en la lista', () => {
    // Simulamos listas guardadas con anterioridad
    // (al ser test unitario no podemos interactuar con otros componentes y el boton para guardar esta en el componente padre)
    component.conversiones.set([
      {
        kilometros: 1,
        millas: 1.61
      },
      {
        kilometros: 2,
        millas: 3.22
      }
    ])

    fixture.detectChanges()

    expect(cantidadFilas()).toEqual(2)
  })

  it('Se borra un elemento de la lista correctamente', () => {
    component.conversiones.set([
      {
        id: 1,
        kilometros: 1,
        millas: 1.61
      },
      {
        id: 2,
        kilometros: 2,
        millas: 3.22
      }
    ])

    fixture.detectChanges()

    test.getByTestId('boton-borrar-1').click()

    expect(cantidadFilas()).toEqual(2)
    fixture.detectChanges()
    expect(cantidadFilas()).toEqual(1)
  })

  function cantidadFilas() {
    return test.getAllByTestId('fila').length
  }
})
