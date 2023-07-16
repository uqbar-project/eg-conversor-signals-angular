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

  it('should have correct initial values', () => {
    fixture.detectChanges()
    const milesNumber = getByTestId('miles-number')
    const miles = localeToNumber(milesNumber.textContent)

    expect(miles).toEqual(0)
  })

  it('should change the value of miles, kilometers and if it is decimal or not when submit another miles value', async () => {
    const conversorButton = getByTestId('convert-button')

    app.millasInput = '10'
    conversorButton.click()

    fixture.detectChanges()

    const miles = localeToNumber(getByTestId('miles-number').textContent)
    const kilometers = localeToNumber(
      getByTestId('kilometers-number').textContent
    )
    const numberType = getByTestId('number-type').textContent

    expect(miles).toEqual(10)
    expect(numberType).toEqual('Entero')
    expect(kilometers).toEqual(16.09)
  })

  // ------------------ Helpers ------------------

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }

  function localeToNumber(value: string): number {
    const decimalSymbol = getLocaleNumberSymbol(
      app.locale,
      NumberSymbol.Decimal
    )

    return +value.replace(decimalSymbol, '.')
  }
})
