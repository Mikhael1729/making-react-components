import * as React from 'react';
import LabelCheckbox, { LabelCheckboxProps } from './LabelCheckbox';
import "styles/MultiSelect.css";

export interface MultiSelectProps<T> {
  onChange?: (checked?: boolean, data?: T, text?: string) => void;
  defaultText?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children?: any;
  enableSearch?: boolean;
}

export interface MultiSelectState {
  expanded: boolean;
  selectedText: string[];
  text: string;
}

export default class MultiSelect<T> extends React.Component<
  MultiSelectProps<T>,
  MultiSelectState
  > {
  state: MultiSelectState = {
    expanded: false,
    selectedText: [],
    text: ""
  };

  private titleRef: any = React.createRef();
  private checkboxesRef: any = React.createRef();
  private lettersDivRef: any = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this.changeSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeSize);
  }

  componentWillMount() {
    this.setState(prevState => {
      const selectedText = [...prevState.selectedText];
      const selected = this.props.children.filter((c: any) => c.props.checked === true);

      if (selected)
        selected.forEach((s: any) => {
          selectedText.push(s.props.children)
        })

      return { selectedText }
    })
  }

  async componentWillReceiveProps(nextProps: MultiSelectProps<T>) {
    if (this.props.disabled === true && nextProps.disabled === false) {
      this.setState({ selectedText: [] })
    }
  }

  private changeSize = () => {
    const referencia = this.titleRef.current;
    const checkboxes = this.checkboxesRef.current;

    if (referencia !== undefined && checkboxes !== undefined) {
      checkboxes.style.width = `${referencia.clientWidth}px`;
    }
  };

  private showCheckboxes = () => {
    if (!this.props.disabled) {
      this.changeSize();
      this.setState(prevState => {
        return {
          expanded: !prevState.expanded
        };
      });
    }
  };

  private hideCheckboxes = () => {
    this.changeSize();
    this.setState({ expanded: false });
  };

  private change = async (checked: boolean, data: T, text: string) => {
    this.lettersDivRef.current.focus();
    this.props.onChange ? this.props.onChange(checked, data, text) : null;

    this.setState(prevState => {
      const letters = [...prevState.selectedText];
      const index = letters.findIndex(l => l === text);

      if (!checked) {
        letters.splice(index, 1);
      } else {
        letters.push(text);
      }

      return { selectedText: letters, expanded: true };
    });
  };

  private computeSelectedLetters = (): string | undefined => {
    let selectedLetters = this.props.defaultText;
    if (this.state.selectedText.length > 0) {
      selectedLetters = "";
      this.state.selectedText.forEach((text, index) => {
        selectedLetters +=
          text + (index < this.state.selectedText.length - 1 ? ", " : "");
      });
    }

    return selectedLetters;
  }

  private computeLabels = (): any => {
    const labels = [] as any[];

    // Iterating in each label.
    React.Children.forEach(
      this.props.children,
      (child: any, index: number) => {
        if (child.type === LabelCheckbox) {
          // Creating props.
          type Props = LabelCheckboxProps<T> | { key: number };

          // Searching if there are a selected CheckboxLabel.
          const match = this.state.selectedText.find(s => s === child.props.children.toString());

          // Cloning LabelCheckbox with props.
          const labelCheckbox = React.cloneElement(child, {
            key: index,
            onChange: this.change,
            checked: match ? true : false,
            pointer: true,
          } as Props);

          labels.push(labelCheckbox);
        }
      }
    )

    return labels;
  }

  private onChangeInput = (e: any) => this.setState({ text: e.target.value })

  render() {
    // Expanded.
    const { expanded } = this.state;

    // Loading.
    const { loading } = this.props;

    // Border bottom
    const borderBottom = expanded
      ? "1px solid transparent"
      : "1px solid #caced7";

    // Computing preview
    const selectedLetters = this.computeSelectedLetters();

    // Labels
    const Labels = this.computeLabels();

    // Classes.
    const labelClasses = `form-select select-${
      this.props.size ? this.props.size : "md"
      } ${this.props.disabled ? "disabled" : ""}`;

    return (
      <div
        ref={this.lettersDivRef}
        tabIndex={0}
        onBlur={this.hideCheckboxes}
        className="checkboxes-select"
      >
        {/* Label */}
        <div ref={this.titleRef}>
          <div
            onClick={this.showCheckboxes}
            className={labelClasses}
            style={{ borderBottom }}
          >
            <option>{!this.props.disabled ? selectedLetters : this.props.defaultText}</option>
          </div>
        </div>

        {/* Options */}
        <div
          id="checkboxes"
          ref={this.checkboxesRef}
          style={{
            display: expanded ? "block" : "none",
            textAlign: loading ? "center" : "initial"
          }}
        >
          {loading
            ? <span>
              <br />
              <i className="loading" />
              &nbsp;
              </span>
            : Labels}
        </div>
      </div>
    );
  }
}
