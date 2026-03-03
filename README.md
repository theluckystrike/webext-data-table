# webext-data-table

A performant, virtualized data table component for Chrome extensions built with vanilla JavaScript and Web Components.

## Features

- Virtual scrolling for large datasets (10,000+ rows)
- Sortable columns
- Resizable columns
- Custom cell renderers
- Lightweight (~5KB gzipped)
- No dependencies

## Installation

```bash
npm install webext-data-table
```

## Usage

### Basic Table

```javascript
import { DataTable } from 'webext-data-table';

const table = new DataTable('#container', {
  columns: [
    { key: 'id', label: 'ID', width: 60 },
    { key: 'name', label: 'Name', width: 200 },
    { key: 'email', label: 'Email', width: 250 },
    { key: 'status', label: 'Status', width: 100 }
  ],
  data: [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' }
  ]
});
```

### With Virtual Scrolling

```javascript
const table = new DataTable('#container', {
  columns: [...],
  data: largeDataset, // 10,000+ rows
  rowHeight: 40,
  visibleRows: 15
});
```

### Sorting

```javascript
table.sort('name', 'asc'); // Sort by name ascending
table.sort('name', 'desc'); // Sort by name descending
```

### Custom Cell Renderer

```javascript
const table = new DataTable('#container', {
  columns: [
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row) => `<button data-id="${row.id}">Edit</button>`
    }
  ],
  data: [...]
});
```

## API

### DataTable

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| container | string | - | CSS selector for container element |
| columns | Array | [] | Column definitions |
| data | Array | [] | Table data |
| rowHeight | number | 40 | Height of each row in pixels |
| visibleRows | number | 10 | Number of visible rows |

### Events

```javascript
table.on('rowClick', (row) => {
  console.log('Row clicked:', row);
});

table.on('sort', (column, direction) => {
  console.log(`Sorted by ${column} ${direction}`);
});
```

## Browser Support

- Chrome 90+
- Edge 90+
- Chromium-based browsers

## License

MIT
