import localeEs from '@angular/common/locales/es'
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { HistorialComponent } from './historial/historial.component'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { LOCALE_ID } from '@angular/core'
import {
  NumberSymbol,
  getLocaleNumberSymbol,
  registerLocaleData
} from '@angular/common'

registerLocaleData(localeEs)

let fixture: ComponentFixture<AppComponent>
let app: AppComponent

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
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it(`should have as title 'eg-conversor-signals-angular'`, () => {
    expect(app.title).toEqual('eg-conversor-signals-angular')
  })

  it('should render title', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(
      compiled.querySelector('[data-testid="titulo"]')?.textContent
    ).toContain('Conversor Angular con Signals')
  })

  it('Deberia tener valores iniciales correctos', () => {
    fixture.detectChanges()

    const miles = localeToNumberByTestId('miles-number')

    expect(miles).toEqual(0)
  })

  it('Deberia cambiar el valor de millas, kilometros y si es dcimal o entero cuando se quiere convertir', async () => {
    const conversorButton = getByTestId('convert-button')

    app.millasInput = '10'
    conversorButton.click()

    fixture.detectChanges()

    const miles = localeToNumberByTestId('miles-number')
    const kilometers = localeToNumberByTestId('kilometers-number')
    const numberType = getByTestId('number-type').textContent

    expect(miles).toEqual(10)
    expect(numberType).toEqual('Entero')
    expect(kilometers).toEqual(16.09)
  })

  it('Deberia obtenerse un valor decimal cuando se ingresa un numero con coma', () => {
    const conversorButton = getByTestId('convert-button')

    app.millasInput = '10' + decimalSymbol() + '5' // 10,5 en es-ES
    conversorButton.click()

    fixture.detectChanges()

    const numberType = getByTestId('number-type').textContent
    expect(numberType).toEqual('Decimal')
  })

  it('Se incrementa el valor de millas con el boton + en un valor fijo', () => {
    const incrementButton = getByTestId('increment-button')

    app.millas.set(10)
    incrementButton.click()

    fixture.detectChanges()

    const miles = localeToNumberByTestId('miles-number')

    expect(miles).toEqual(10 + app.stepSize)
  })

  it('Se decrementa tres veces el valor de millas con el boton - en un valor fijo', () => {
    const decrementButton = getByTestId('decrement-button')

    app.millas.set(10)
    decrementButton.click()
    decrementButton.click()
    decrementButton.click()

    fixture.detectChanges()

    // const miles = localeToNumber(getByTestId('miles-number').textContent)
    const miles = localeToNumberByTestId('miles-number')

    expect(miles).toEqual(10 - app.stepSize * 3)
  })

  it('Se resetean los valores de millas y kilometros cuando se hace click en el boton reset', () => {
    const resetButton = getByTestId('reset-button')

    // Se setea un valor inicial
    app.millas.set(10)
    fixture.detectChanges()

    // Se hace click en el boton reset
    resetButton.click()
    let miles = localeToNumberByTestId('miles-number')
    expect(miles).toEqual(10) // Test previo al click

    fixture.detectChanges()

    miles = localeToNumberByTestId('miles-number')
    const kilometers = localeToNumber(
      getByTestId('kilometers-number').textContent
    )

    expect(miles).toEqual(0)
    expect(kilometers).toEqual(0)
  })

  // ------------------ Helpers ------------------
  function decimalSymbol() {
    return getLocaleNumberSymbol(app.locale, NumberSymbol.Decimal)
  }

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }

  function localeToNumber(value: string): number {
    return +value.replace(decimalSymbol(), '.')
  }

  function localeToNumberByTestId(testId: string): number {
    const value = getByTestId(testId).textContent
    return localeToNumber(value)
  }
})
