declare module "simplebar-react" {
  import * as React from "react";
  import SimpleBarCore from "simplebar";

  interface SimpleBarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    scrollableNodeProps?: React.HTMLAttributes<HTMLDivElement>;
    placeholderProps?: React.HTMLAttributes<HTMLDivElement>;
    autoHide?: boolean;
    forceVisible?: boolean | "x" | "y";
    clickOnTrack?: boolean;
    scrollbarMinSize?: number;
    scrollbarMaxSize?: number;
    timeout?: number;
    offset?: number;
  }

  export default class SimpleBar extends React.Component<SimpleBarProps> {}
}
