import React from 'react';

interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any) => void;
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  striped = true,
  hoverable = true,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Cargando datos...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No hay datos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-3 text-left text-sm font-semibold text-gray-700 ${
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''
                }`}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`border-b border-gray-200 transition-colors ${
                striped && idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'
              } ${hoverable && onRowClick ? 'hover:bg-blue-50 cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-6 py-4 text-sm text-gray-900 ${
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''
                  }`}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
