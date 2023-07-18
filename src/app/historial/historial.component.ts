import { Component, Input, signal } from '@angular/core'
import { Conversion } from 'src/DTO/conversion'

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  @Input('conversaciones') conversiones = signal<Conversion[]>([])

  borrarConversion(id: number) {
    const indice = this.conversiones().findIndex(
      (conversion) => conversion.id === id
    )
    this.conversiones.mutate((conversion) => conversion.splice(indice, 1))
  }
}
