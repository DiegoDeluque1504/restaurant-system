import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesService } from '../../../core/services/tables.service';
import { Table, TABLE_STATUS_LABELS } from '../../../core/models/table.model';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-list.html',
})
export class TableListComponent {
  tables: Table[] = [];
  statusLabels = TABLE_STATUS_LABELS;

  constructor(private tablesService: TablesService) {}

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.tablesService.getAll().subscribe({
      next: (data) => this.tables = data
    });
  }

  changeStatus(table: Table, status: Table['status']) {
    this.tablesService.updateStatus(table.id!, status).subscribe({
      next: () => this.loadTables()
    });
  }
}