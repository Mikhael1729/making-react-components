import * as React from 'react';
import LabelCheckbox, { LabelCheckboxProps } from '../LabelCheckbox/LabelCheckbox';
import { Checkboxes, CheckboxesSelect, InputSearch, LabelCheckbox as LabelCheckboxStyles} from "components/MultiSelect/MultiSelect.module.css"

export interface MultiSelectProps<T> {
  onChange?: (checked?: boolean, data?: T, text?: string) => void;
  onDelete?: (checked?: boolean, data?: T, text?: string) => void;
  defaultText?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children?: any;
  enableSearch?: boolean;
}

export interface MultiSelectState {
  expanded: boolean;
  text: string;
  writtingSearchCriteria: boolean;
  removingSelectedOption: boolean;
  matches: string[]
}

export default class MultiSelect<T> extends React.Component<
  MultiSelectProps<T>,
  MultiSelectState
  > {
  //#region Properties
  constructor(props: MultiSelectProps<T>) {
    super(props);

    this.state = {
      expanded: false,
      text: "",
      removingSelectedOption: false,
      writtingSearchCriteria: true,
      matches: [],
    };
  }

  private get options(): string[] {
    const selected: string[] = []
    this.extractOptions().forEach(o => {
      if (o.children)
        selected.push(o.children.toString())
    })
    return selected;
  }

  private get selectedOptions(): string[] {
    const selected: string[] = []
    this.extractOptions().filter(o => o.checked === true).forEach(s => {
      if (s.children)
        selected.push(s.children.toString())
    })
    return selected;
  }
  private titleRef: any = React.createRef();
  private checkboxesRef: any = React.createRef();
  private parentDivRef: any = React.createRef();
  private inputRef: any = React.createRef();
  //#endregion

  //#region Lifecycle Methods 
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

  componentWillUpdate(nextProps: MultiSelectProps<T>, nextState: MultiSelectState) {
    // Used to delete an option from text.
    if(nextState.removingSelectedOption || nextProps.children !== this.props.children) {
      const selectedOptions: string[] = [];
      const children = nextProps.children;

      if(children) {
        React.Children.forEach(children, (child: any) => {
          const text = child.props.children;
          const isChecked = child.props.checked;

          if(text)
            if(isChecked) 
              selectedOptions.push(text.toString());
        })
      }

      this.setState({ 
        text: selectedOptions.join(', '), 
        removingSelectedOption: false, 
        writtingSearchCriteria: false,
      })
    }
  }

  componentDidUpdate(prevProps: MultiSelectProps<T>, prevState: MultiSelectState) {
    // Moving the cursor to the end of input text.
    if (prevState.text !== this.state.text) {
      this.inputRef.current.selectionStart = this.inputRef.current.value.length;
      this.inputRef.current.selectionEnd = this.inputRef.current.value.length;
    }
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
      checkboxesRef.style.width = `${titleRef.clientWidth - 1.59}px`;
    }
  };

  private showCheckboxes = () => {
    if (!this.props.disabled) {
      this.changeSize();
      this.setState({ expanded: true })
    }
  }

  private hideCheckboxes = () => this.setState({ expanded: false })

  private change = (checked: boolean, data: T, text: string) => {
    const selected = this.selectedOptions;
    const index = selected.findIndex(s => s === text);

    if (checked && index < 1)
      selected.push(text);
    else
      selected.splice(index, 1);

    this.setState({
      text: selected.join(', '),
      writtingSearchCriteria: false,
      matches: []
    }, () => {
      const onChange = this.props.onChange;

      if (onChange)
        onChange(checked, data, text)
    });
  };

  private computeLabels = (): any => {
    const labels = [] as any[];

    // Iterating in each label.
    React.Children.forEach(
      this.props.children,
      (child: any) => {
        if (child.type === LabelCheckbox) {
          // Creating props.
          type Props = LabelCheckboxProps<T> | { key: number };

          // Cloning LabelCheckbox with props.
          const labelCheckbox = React.cloneElement(child, {
            onChange: this.change,
            pointer: true,
            className: child.props.className + ' ' + LabelCheckboxStyles
          } as Props);

          if(this.state.matches.length > 0) {
            const option = labelCheckbox.props.children;
            if(option) {
              const match = this.state.matches.find(m => m.toLowerCase() === option.toString().toLowerCase())
              if(match) {
                labels.push(labelCheckbox);
              }
            }
          } else {
            labels.push(labelCheckbox)
          }
        }
      }
    )

    return labels;
  }

  private onChangeInput = (e: any) => {
    const newValue = e.target.value as string;
    const selectedOptions = this.selectedOptions;

    // If there are a new value.
    if (newValue) {
      const separation = this.createSeparation();
      const selected = selectedOptions.join(", ");
      const criteria = newValue.slice(selected.length + separation.length, newValue.length).replace(/,/g, '').trim();
      this.setState({
        text: selected + separation + criteria,
        writtingSearchCriteria: criteria.length > 0 ? true : false,
        matches: this.search(criteria)
      });
    }
    // If there there isn't a new value.
    else {
      this.setState({ text: "", matches: [] })
    }
  }

  private onDelete = (e: any) => {
    if (e.keyCode === 8) {
      if (!this.state.writtingSearchCriteria) {
        const toDelete = this.selectedOptions[this.selectedOptions.length - 1];

        if(this.props.onChange) {
          const option = this.getOption(toDelete);
          if(option)  {
            this.setState({ removingSelectedOption: true })
            this.props.onChange(false, option.data, toDelete);
          }
        }
      }
    }
  }

  private onFocusInput = () => {
    if (!this.state.writtingSearchCriteria)
      this.setState(prevState => {
        let text = prevState.text;
        text += this.createSeparation();
        return { text }
      })
  }

  private onBlurInput = () => {
    if (!this.state.writtingSearchCriteria)
      this.setState({ text: this.selectedOptions.join(", ") })
  }

  private search = (searchKey: string): string[] => {
    const matches: string[] = [];
    this.options.forEach(option => {
      const match = option.toLowerCase().match(searchKey.toLowerCase());

      if (match)
        if (match.input)
          matches.push(match.input);
    });

    return matches;
  }

  private createSeparation = (): string => (this.selectedOptions.length > 0 ? ", " : "");

  private extractOptions = (): Array<LabelCheckboxProps<T>> => {
    const options: Array<LabelCheckboxProps<T>> = [];

    React.Children.forEach(this.props.children, (child: any) => {
      options.push(child.props);
    });

    return options;
  }

  private getOption = (text: string): LabelCheckboxProps<T> | undefined => {
    const options = this.extractOptions();
    const option = options.find(o => {
      if(o.children) 
        return o.children.toString() === text;
      else 
        return false
    })

    return option
  }
  //#endregion

  //#region Render
  render() {
    // Expanded.
    const expanded = this.state.expanded;

    // Loading.
    const loading = this.props.loading;

    // Border bottom
    const borderBottom = expanded
      ? "1px solid transparent"
      : "1px solid #caced7";

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
        className={CheckboxesSelect}
      >
        {/* Label */}
        <div
          ref={this.titleRef}
          onClick={this.showCheckboxes}
          className={labelClasses}
          style={{ borderBottom }}
        >
          <input
            ref={this.inputRef}
            type="text"
            className={InputSearch}
            value={this.state.text}
            placeholder={this.props.defaultText}
            onFocus={this.onFocusInput}
            onBlur={this.onBlurInput}
            onClick={this.showCheckboxes}
            disabled={this.props.disabled}
            onKeyDown={this.onDelete}
            onChange={this.onChangeInput} />
        </div>

        {/* Options */}
        <div
          id={Checkboxes}
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
