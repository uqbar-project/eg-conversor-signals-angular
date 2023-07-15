import { NumberSymbol, getLocaleNumberSymbol } from '@angular/common'
import {
  Component,
  signal,
  computed,
  effect,
  Inject,
  LOCALE_ID
} from '@angular/core'
import { Conversion } from 'src/DTO/conversion'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eg-conversor-signals-angular'
  millasInput: string = ''

  // Parámetros de conversión
  millas = signal(0)
  kilometros = computed(() => this.millas() * 1.60934)

  // Parámetros de referencia
  isDecimal = computed(() => !Number.isInteger(this.millas()))

  // Lista de conversiones guardadas
  listaConversiones = signal<Conversion[]>([])

  constructor(@Inject(LOCALE_ID) public locale: string) {
    effect(() => {
      // Veremos cómo esto se llama solamente cuando cambia el valor de isDecimal
      console.log(this.isDecimal() ? 'Es Decimal' : 'Es Entero')
    })

    effect(() => {
      // Este effect se va a ejecutar tanto desde los cambios de listaConversiones en este componente como en el componente hijo
      console.log(
        'Se hizo un cambio en lista conversiones',
        this.listaConversiones()
      )
    })
  }

  set(millas: number) {
    if (!this.validateInput()) throw new Error('Valor no válido')
    this.millas.set(millas)
  }

  incrementar(pasos: number = 1) {
    this.millas.update((millas) => millas + pasos)
  }

  decrementar(pasos: number = 1) {
    this.millas.update((millas) => millas - pasos)
  }

  guardarConversion(millas: number, kilometros: number) {
    this.listaConversiones.mutate((lista) => lista.push({ millas, kilometros }))
  }

  resetear() {
    this.set(0)
    this.millasInput = '0'
  }

  // --- Validaciones
  validateInput(): boolean {
    const decimalSymbol = getLocaleNumberSymbol(
      this.locale,
      NumberSymbol.Decimal
    )

    const sanitizedValue = this.millasInput.replace(decimalSymbol, '.')

    return sanitizedValue == '' || !isNaN(Number(sanitizedValue))
  }
}
