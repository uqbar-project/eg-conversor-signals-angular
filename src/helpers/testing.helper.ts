import { ComponentFixture } from '@angular/core/testing'
import { NumberSymbol, getLocaleNumberSymbol } from '@angular/common'

export class TestingHelper<T> {
  decimalSymbol: string = '.'

  private constructor(
    private fixture: ComponentFixture<T>,
    public locale: string
  ) {}

  static createHelper<T>(fixture: ComponentFixture<T>, locale: string = 'en') {
    const testingHelper = new TestingHelper(fixture, locale)
    testingHelper.decimalSymbol = getLocaleNumberSymbol(
      locale,
      NumberSymbol.Decimal
    )
    return testingHelper
  }

  getByTestId(testId: string) {
    const resultHtml = this.fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }

  getAllByTestId(testId: string) {
    const resultHtml = this.fixture.debugElement.nativeElement
    return resultHtml.querySelectorAll(`[data-testid="${testId}"]`)
  }

  localeToNumber(value: string): number {
    return +value.replace(this.decimalSymbol, '.')
  }

  localeToNumberByTestId(testId: string): number {
    const value = this.getByTestId(testId).textContent
    return this.localeToNumber(value)
  }
}
