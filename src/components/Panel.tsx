import React from "react";

type Props = {
  children: any,
  header?: string,
  footer?: string
};

export function Panel({ children, header, footer }: Props) {
  return (
    <div className="ais-Panel">
      {header && <div className="ais-Panel-header">{header}</div>}
      <div className="ais-Panel-body">{children}</div>
      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  );
}
