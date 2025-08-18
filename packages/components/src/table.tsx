import React from 'react';
import { Unbreakable } from '../dist';

interface TableProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isHeader?: boolean;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isHeader?: boolean;
}

export const Table: React.FC<TableProps> = ({ 
  children, 
  className = '', 
  style = {},
  ...props 
}) => {
  return (
    <table 
      className={`skrift-table ${className}`}
      style={{ 
        width: '100%',
        borderCollapse: 'collapse',
        ...style 
      }}
      data-skrift-table="true"
      {...props}
    >
      {children}
    </table>
  );
};

export const TableHeader: React.FC<TableHeaderProps> = ({ 
  children, 
  className = '', 
  style = {},
  ...props 
}) => {
  return (
    <thead 
      className={`skrift-table-header ${className}`}
      style={style}
      data-skrift-table-header="true"
      {...props}
    >
      {children}
    </thead>
  );
};

export const TableBody: React.FC<TableBodyProps> = ({ 
  children, 
  className = '', 
  style = {},
  ...props 
}) => {
  return (
    <tbody 
      className={`skrift-table-body ${className}`}
      style={style}
      data-skrift-table-body="true"
      {...props}
    >
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableRowProps> = ({ 
  children, 
  className = '', 
  style = {},
  isHeader = false,
  ...props 
}) => {
  return (
    <tr 
      className={`skrift-table-row skrift-unbreakable ${isHeader ? 'skrift-table-header-row' : ''} ${className}`}
      style={style}
      data-skrift-table-row="true"
      data-is-header={isHeader}
      data-unbreakable="true"
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableCell: React.FC<TableCellProps> = ({ 
  children, 
  className = '', 
  style = {},
  isHeader = false,
  ...props 
}) => {
  const Tag = isHeader ? 'th' : 'td';
  
  return (
    <Tag 
      className={`skrift-table-cell ${isHeader ? 'skrift-table-header-cell' : ''} ${className}`}
      style={{ 
        padding: isHeader ? "unset" : '8px',
        border: '1px solid #e5e7eb',
        textAlign: 'left',
        ...style 
      }}
      data-skrift-table-cell="true"
      data-is-header={isHeader}
      {...props}
    >
      {children}
    </Tag>
  );
};