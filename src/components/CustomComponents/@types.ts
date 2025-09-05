import React from "react"

export type CustomDivProps = React.AllHTMLAttributes<any> & { type: 'foreground' | 'background' } & {children?: React.ReactNode}

type tableStatusProp = 'text' | 'number' | 'password' | 'status' | 'delete' | 'edit' | 'show' | 'log' | "toggle"

export type CustomTableProps = Omit<React.AllHTMLAttributes<HTMLTableElement>, 'data'> & 
    {
        head: Array<string> ;
        types: Array<tableStatusProp> ;
        extractkeys: Array<string> ;
        extractId: string;
        data : Array<any> ;
        tableClassName?: string;
        trClassName?: string;
        thClassName?: string;
        tdClassName?: string;
        buttonClassName?: string;
        onDelete?: (id: string) => void;
        onShow?: (id: string) => void;
        onUpdate?: (id: string) => void;
        onDataClick?: (id: string) => void;
    } 