/**
 * Data Table — Sortable, filterable, paginated table component
 */
export interface Column<T = any> { key: string; label: string; sortable?: boolean; render?: (value: any, row: T) => string; width?: string; }
export interface TableOptions { pageSize?: number; striped?: boolean; hoverable?: boolean; compact?: boolean; }

export class DataTable<T extends Record<string, any>> {
    private columns: Column<T>[];
    private data: T[];
    private filteredData: T[];
    private sortKey: string | null = null;
    private sortAsc = true;
    private page = 0;
    private pageSize: number;
    private options: TableOptions;
    private selected = new Set<number>();
    private container: HTMLElement | null = null;

    constructor(columns: Column<T>[], data: T[], options: TableOptions = {}) {
        this.columns = columns; this.data = data; this.filteredData = [...data];
        this.pageSize = options.pageSize || 20; this.options = options;
    }

    /** Sort by column key */
    sort(key: string): this {
        if (this.sortKey === key) this.sortAsc = !this.sortAsc;
        else { this.sortKey = key; this.sortAsc = true; }
        this.filteredData.sort((a, b) => {
            const va = a[key]; const vb = b[key];
            const cmp = typeof va === 'string' ? va.localeCompare(vb) : (va > vb ? 1 : va < vb ? -1 : 0);
            return this.sortAsc ? cmp : -cmp;
        });
        this.render(); return this;
    }

    /** Filter data with predicate */
    filter(predicate: (row: T) => boolean): this {
        this.filteredData = this.data.filter(predicate); this.page = 0; this.render(); return this;
    }

    /** Text search across all columns */
    search(query: string): this {
        if (!query) { this.filteredData = [...this.data]; } else {
            const q = query.toLowerCase();
            this.filteredData = this.data.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(q)));
        }
        this.page = 0; this.render(); return this;
    }

    /** Go to page */
    goToPage(page: number): this { this.page = Math.max(0, Math.min(page, this.totalPages - 1)); this.render(); return this; }
    nextPage(): this { return this.goToPage(this.page + 1); }
    prevPage(): this { return this.goToPage(this.page - 1); }
    get totalPages(): number { return Math.ceil(this.filteredData.length / this.pageSize); }
    get currentPage(): number { return this.page; }

    /** Toggle row selection */
    toggleSelect(index: number): this { this.selected.has(index) ? this.selected.delete(index) : this.selected.add(index); this.render(); return this; }
    getSelected(): T[] { return Array.from(this.selected).map((i) => this.filteredData[i]).filter(Boolean); }
    clearSelection(): this { this.selected.clear(); this.render(); return this; }

    /** Export to CSV */
    toCSV(): string {
        const header = this.columns.map((c) => c.label).join(',');
        const rows = this.filteredData.map((row) => this.columns.map((c) => `"${String(row[c.key] ?? '').replace(/"/g, '""')}"`).join(','));
        return [header, ...rows].join('\n');
    }

    /** Download CSV */
    downloadCSV(filename: string = 'export.csv'): void {
        const blob = new Blob([this.toCSV()], { type: 'text/csv' });
        const url = URL.createObjectURL(blob); const a = document.createElement('a');
        a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
    }

    /** Mount to container */
    mount(containerId: string): this { this.container = document.getElementById(containerId); this.render(); return this; }

    /** Render table */
    private render(): void {
        if (!this.container) return;
        const start = this.page * this.pageSize;
        const pageData = this.filteredData.slice(start, start + this.pageSize);
        const stripe = this.options.striped !== false;

        const headerCells = this.columns.map((col) => {
            const arrow = this.sortKey === col.key ? (this.sortAsc ? ' ↑' : ' ↓') : '';
            const cursor = col.sortable !== false ? 'cursor:pointer' : '';
            return `<th style="padding:10px 14px;text-align:left;font-weight:600;border-bottom:2px solid #E5E7EB;${cursor};white-space:nowrap;${col.width ? `width:${col.width}` : ''}" data-sort="${col.key}">${col.label}${arrow}</th>`;
        }).join('');

        const rows = pageData.map((row, i) => {
            const bg = stripe && i % 2 ? 'background:#F9FAFB' : '';
            const sel = this.selected.has(start + i) ? 'background:#EBF5FF' : '';
            const cells = this.columns.map((col) => {
                const val = col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '');
                return `<td style="padding:8px 14px;border-bottom:1px solid #F3F4F6">${val}</td>`;
            }).join('');
            return `<tr style="${bg};${sel}" data-row="${start + i}">${cells}</tr>`;
        }).join('');

        const paging = `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;font-size:13px;color:#6B7280">
      <span>${this.filteredData.length} rows</span>
      <span>Page ${this.page + 1} of ${this.totalPages || 1}</span></div>`;

        this.container.innerHTML = `<div style="font-family:-apple-system,sans-serif;font-size:14px;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">
      <table style="width:100%;border-collapse:collapse"><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table>${paging}</div>`;

        this.container.querySelectorAll('th[data-sort]').forEach((th) => {
            th.addEventListener('click', () => this.sort((th as HTMLElement).dataset.sort || ''));
        });
    }
}
