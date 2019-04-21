import { Colors } from "types/Colors";

export interface IColorClasses {
  primary?: string;
  secondary?: string;
  warning?: string;
  default?: string;
}

export class ClassesSelector {
  static computeColor(color: Colors | undefined, styles: IColorClasses): string {
    switch (color) {
      case "primary":
        return styles.primary || "";
      case "secondary":
        return styles.secondary || "";
      case "warning":
        return styles.warning || "";
      default:
        return styles.default || "";
    }
  }
}