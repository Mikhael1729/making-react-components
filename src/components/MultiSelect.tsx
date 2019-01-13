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
  //#region Properties
  state: MultiSelectState = {
    expanded: false,
    selectedText: [],
    text: ""
  };

  private titleRef: any = React.createRef();
  private checkboxesRef: any = React.createRef();
  private parentDivRef: any = React.createRef();
  //#endregion

  //#region Lifecycle Methods
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
  componentDidMount() {
    const parent = this.parentDivRef.current;

    // Puting the same width of the label parent to checkboxs div.
    window.addEventListener("resize", this.changeSize);

    // Subscribing of focus in of parent div
    parent.addEventListener('focusin', this.focusIn);

    // Subscribing of focus out of parent div.
    parent.addEventListener('focusout', this.focusOut);


    // Adding the same size of the label parent to checkboxs div
    this.changeSize();
  }

  componentWillReceiveProps(nextProps: MultiSelectProps<T>) {
    // Reset selected options.
    if (this.props.disabled && !nextProps.disabled)
      this.setState({ selectedText: [] })
  }

  componentWillUnmount() {
    const parent = this.parentDivRef.current;
    window.removeEventListener("resize", this.changeSize)
    parent.removeEventListener("focusin", this.focusIn)
    parent.removeEventListener("focusout", this.focusOut)
  }
  //#endregion

  //#region Private Methods
  private focusIn = (e: any) => {
    const parent = this.parentDivRef.current
    const enteringParent = !parent.contains(e.relatedTarget)

    if (enteringParent && !this.state.expanded)
      this.showCheckboxes()
  }

  private focusOut = (e: any) => {
    const parent = this.parentDivRef.current
    const leavingParent = !parent.contains(e.relatedTarget)

    if (leavingParent && this.state.expanded)
      this.hideCheckboxes()
  }

  private changeSize = () => {
    const titleRef = this.titleRef.current
    const checkboxesRef = this.checkboxesRef.current

    if (titleRef !== undefined && checkboxesRef !== undefined) {
      checkboxesRef.style.width = `${titleRef.clientWidth + 2}px`;
    }
  };

  private showCheckboxes = () => this.setState({ expanded: true })

  private hideCheckboxes = () => this.setState({ expanded: false })

  private change = (checked: boolean, data: T, text: string) => {
    this.props.onChange ? this.props.onChange(checked, data, text) : null;

    this.setState(prevState => {
      const letters = [...prevState.selectedText]
      const index = letters.findIndex(l => l === text)

      if (!checked) {
        letters.splice(index, 1)
      } else {
        letters.push(text)
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
          text + (index < this.state.selectedText.length - 1 ? ", " : "")
      })
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
  //#endregion

  //#region Render
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
        ref={this.parentDivRef}
        tabIndex={0}
        className="checkboxes-select"
      >
        {/* Label */}
        <div
          ref={this.titleRef}
          onClick={this.showCheckboxes}
          className={labelClasses}
          style={{ borderBottom }}
        >
          <input
            type="text"
            className="input-search"
            value={this.state.text}
            onClick={this.showCheckboxes}
            onChange={this.onChangeInput} />
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
  //#endregion
}
