# webext-data-table

[![npm version](https://img.shields.io/npm/v/webext-data-table)](https://npmjs.com/package/webext-data-table)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![CI Status](https://img.shields.io/github/actions/workflow/status/theluckystrike/webext-data-table/ci.yml?branch=main)](https://github.com/theluckystrike/webext-data-table/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/webext-data-table?style=social)](https://github.com/theluckystrike/webext-data-table)

> A performant, virtualized data table component for Chrome extensions built with vanilla JavaScript and Web Components.

## Overview

**webext-data-table** is a lightweight, performant data table component designed for Chrome extensions. It features virtual scrolling for large datasets, sortable columns, resizable columns, and custom cell renderers — all with zero dependencies.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Virtual Scrolling** - Handle 10,000+ rows efficiently
- ✅ **Sortable Columns** - Click to sort
- ✅ **Resizable Columns** - Drag to resize
- ✅ **Custom Renderers** - Full control over cell content
- ✅ **Lightweight** - ~5KB gzipped
- ✅ **Zero Dependencies** - No bloat

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

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/data-table-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/data-table-feature`
7. **Submit** a Pull Request

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [webext-web-components](https://github.com/theluckystrike/webext-web-components) - Web Components library
- [webext-skeleton-loader](https://github.com/theluckystrike/webext-skeleton-loader) - Loading placeholders
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Extension template
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
