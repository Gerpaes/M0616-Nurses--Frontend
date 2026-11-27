import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

type NurseStatus = 'active' | 'onCall' | 'off';
type StatusFilter = 'all' | NurseStatus;

interface Nurse {
  id: number;
  name: string;
  ward: string;
  status: NurseStatus;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  /** Query que devuelve exactamente 3 resultados con el mock (Marc, Jordi, Sara). */
  readonly exampleQuery = 'ar';

  readonly filters: StatusFilter[] = ['all', 'active', 'onCall', 'off'];

  // Mock sin backend
  readonly nurses: Nurse[] = [
    { id: 1, name: 'Lucía Ferrer', ward: 'Urgencias', status: 'active' },
    { id: 2, name: 'Marc Roca', ward: 'UCI', status: 'onCall' },
    { id: 3, name: 'Ana Pérez', ward: 'Urgencias', status: 'active' },
    { id: 4, name: 'Jordi Garcia', ward: 'Planta 3 · Medicina interna', status: 'off' },
    { id: 5, name: 'Sara Molina', ward: 'UCI', status: 'onCall' },
    { id: 6, name: 'David Torres', ward: 'Planta 2 · Pediatría', status: 'active' },
  ];

  query = signal('');
  statusFilter = signal<StatusFilter>('all');

  results = computed(() => {
    const q = this.normalize(this.query());
    const status = this.statusFilter();
    return this.nurses.filter(
      (n) =>
        (status === 'all' || n.status === status) &&
        (!q || this.normalize(n.name).includes(q)),
    );
  });

  onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  /** Interacción click: cambia el filtro y, con él, la lista y el contador visibles. */
  setFilter(filter: StatusFilter): void {
    this.statusFilter.set(filter);
  }

  showExample(): void {
    this.query.set(this.exampleQuery);
    this.statusFilter.set('all');
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  private normalize(text: string): string {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }
}