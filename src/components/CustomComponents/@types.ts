import React from "react"

export type CustomDivProps = React.AllHTMLAttributes<any> & { type: 'foreground' | 'background' } & {children?: React.ReactNode}
