import localeEs from '@angular/common/locales/es'
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { HistorialComponent } from './historial/historial.component'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { LOCALE_ID } from '@angular/core'
import { registerLocaleData } from '@angular/common'
import { TestingHelper } from 'src/helpers/testing.helper'

registerLocaleData(localeEs)

let fixture: ComponentFixture<AppComponent>
let app: AppComponent
let test: TestingHelper<AppComponent>

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HistorialComponent],
      imports: [BrowserModule, FormsModule],
      providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        {
          provide: 'NUMBER_FORMATS',
          useValue: { decimal: ',', thousands: '.' },
          multi: true
        }
      ]
    })

    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance

    test = TestingHelper.createHelper(fixture, 'es')
  })

  it('Levanta correctamente', () => {
    expect(app).toBeTruthy()
  })

  it(`Tiene el titulo 'eg-conversor-signals-angular'`, () => {
    expect(app.title).toEqual('eg-conversor-signals-angular')
  })

  it('Renderiza el titulo', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(
      compiled.querySelector('[data-testid="titulo"]')?.textContent
    ).toContain('Conversor Angular con Signals')
  })

  it('Deberia tener valores iniciales correctos', () => {
    fixture.detectChanges()

    const millas = test.localeToNumberByTestId('numero-millas')

    expect(millas).toEqual(0)
  })

  it('Deberia cambiar el valor de millas, kilometros y si es dcimal o entero cuando se quiere convertir', async () => {
    const botonConvertir = test.getByTestId('boton-convertir')

    app.millasInput = '10'
    botonConvertir.click()

    fixture.detectChanges()

    const millas = test.localeToNumberByTestId('numero-millas')
    const kilometros = test.localeToNumberByTestId('numero-kilometros')
    const tipoDeNumero = test.getByTestId('tipo-numero').textContent

    expect(millas).toEqual(10)
    expect(tipoDeNumero).toEqual('Entero')
    expect(kilometros).toEqual(16.09)
  })

  it('Deberia obtenerse un valor decimal cuando se ingresa un numero con coma', () => {
    const botonConvertir = test.getByTestId('boton-convertir')

    app.millasInput = '10' + test.decimalSymbol + '5' // 10,5 en es-ES
    botonConvertir.click()

    fixture.detectChanges()

    const tipoDeNumero = test.getByTestId('tipo-numero').textContent
    expect(tipoDeNumero).toEqual('Decimal')
  })

  it('Se incrementa el valor de millas con el boton + en un valor fijo', () => {
    const botonIncrementar = test.getByTestId('boton-incrementar')

    app.millas.set(10)
    botonIncrementar.click()

    fixture.detectChanges()

    const millas = test.localeToNumberByTestId('numero-millas')

    expect(millas).toEqual(10 + app.tamanioDePasos)
  })

  it('Se decrementa tres veces el valor de millas con el boton - en un valor fijo', () => {
    const botonDecrementar = test.getByTestId('boton-decrementar')

    app.millas.set(10)
    botonDecrementar.click()
    botonDecrementar.click()
    botonDecrementar.click()

    fixture.detectChanges()

    const millas = test.localeToNumberByTestId('numero-millas')

    expect(millas).toEqual(10 - app.tamanioDePasos * 3)
  })

  it('Se resetean los valores de millas y kilometros cuando se hace click en el boton reset', () => {
    const botonReset = test.getByTestId('boton-reset')

    // Se setea un valor inicial
    app.millas.set(10)
    fixture.detectChanges()

    // Se hace click en el boton reset
    botonReset.click()
    let millas = test.localeToNumberByTestId('numero-millas')
    expect(millas).toEqual(10) // Test previo al click

    fixture.detectChanges()

    millas = test.localeToNumberByTestId('numero-millas')
    const kilometros = test.localeToNumber(
      test.getByTestId('numero-kilometros').textContent
    )

    expect(millas).toEqual(0)
    expect(kilometros).toEqual(0)
  })
})
