# webext-data-table — Data Table Component
> **Built by [Zovo](https://zovo.one)** | `npm i webext-data-table`

Sortable, filterable, paginated tables with row selection, CSV export, and styled rendering.

```typescript
import { DataTable } from 'webext-data-table';
const table = new DataTable(
  [{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }],
  data, { pageSize: 20, striped: true }
);
table.mount('table-container');
table.search('active').sort('name');
table.downloadCSV('export.csv');
```
MIT License
