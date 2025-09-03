import React from "react"

export type CustomDivProps = React.AllHTMLAttributes<any> & { type: 'foreground' | 'background' } & {children?: React.ReactNode}

type tableStatusProp = 'text' | 'number' | 'password' | 'status' | 'delete' | 'edit' | 'show' | 'log'

export type CustomTableProps = Omit<React.AllHTMLAttributes<HTMLTableElement>, 'data'> & 
    {
        head: Array<string> ;
        types: Array<tableStatusProp> ;
        extractkeys: Array<string> ;
        extractId: string;
        data : Array<any> ;
        onDelete?: (id: string) => void;
        onUpdate?: (id: string) => void;
        onDataClick?: (id: string) => void;
    } 