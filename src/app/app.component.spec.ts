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

    const miles = test.localeToNumberByTestId('miles-number')

    expect(miles).toEqual(0)
  })

  it('Deberia cambiar el valor de millas, kilometros y si es dcimal o entero cuando se quiere convertir', async () => {
    const conversorButton = test.getByTestId('convert-button')

    app.millasInput = '10'
    conversorButton.click()

    fixture.detectChanges()

    const miles = test.localeToNumberByTestId('miles-number')
    const kilometers = test.localeToNumberByTestId('kilometers-number')
    const numberType = test.getByTestId('number-type').textContent

    expect(miles).toEqual(10)
    expect(numberType).toEqual('Entero')
    expect(kilometers).toEqual(16.09)
  })

  it('Deberia obtenerse un valor decimal cuando se ingresa un numero con coma', () => {
    const conversorButton = test.getByTestId('convert-button')

    app.millasInput = '10' + test.decimalSymbol + '5' // 10,5 en es-ES
    conversorButton.click()

    fixture.detectChanges()

    const numberType = test.getByTestId('number-type').textContent
    expect(numberType).toEqual('Decimal')
  })

  it('Se incrementa el valor de millas con el boton + en un valor fijo', () => {
    const incrementButton = test.getByTestId('increment-button')

    app.millas.set(10)
    incrementButton.click()

    fixture.detectChanges()

    const miles = test.localeToNumberByTestId('miles-number')

    expect(miles).toEqual(10 + app.stepSize)
  })

  it('Se decrementa tres veces el valor de millas con el boton - en un valor fijo', () => {
    const decrementButton = test.getByTestId('decrement-button')

    app.millas.set(10)
    decrementButton.click()
    decrementButton.click()
    decrementButton.click()

    fixture.detectChanges()

    // const miles = localeToNumber(getByTestId('miles-number').textContent)
    const miles = test.localeToNumberByTestId('miles-number')

    expect(miles).toEqual(10 - app.stepSize * 3)
  })

  it('Se resetean los valores de millas y kilometros cuando se hace click en el boton reset', () => {
    const resetButton = test.getByTestId('reset-button')

    // Se setea un valor inicial
    app.millas.set(10)
    fixture.detectChanges()

    // Se hace click en el boton reset
    resetButton.click()
    let miles = test.localeToNumberByTestId('miles-number')
    expect(miles).toEqual(10) // Test previo al click

    fixture.detectChanges()

    miles = test.localeToNumberByTestId('miles-number')
    const kilometers = test.localeToNumber(
      test.getByTestId('kilometers-number').textContent
    )

    expect(miles).toEqual(0)
    expect(kilometers).toEqual(0)
  })
})
