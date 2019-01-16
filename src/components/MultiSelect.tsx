import * as React from 'react';
import "styles/MultiSelect.css";
import LabelCheckbox, { LabelCheckboxProps } from './LabelCheckbox';

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
      writtingSearchCriteria: true,
      matches: []
    };
  }

  private get options(): string[] {
    const selected: string[] = []
    this.extractOptions().forEach(o => {
      if(o.children) 
        selected.push(o.children.toString())
    })
    return selected;
  }

  private get selectedOptions(): string[] {
    const selected: string[] = []
    this.extractOptions().filter(o => o.checked === true).forEach(s => {
      if(s.children) 
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
      checkboxesRef.style.width = `${titleRef.clientWidth + 2}px`;
    }
  };

  private showCheckboxes = () => {
    if(!this.props.disabled) {
      this.changeSize();
      this.setState({ expanded: true })
    }
  }

  private hideCheckboxes = () => this.setState({ expanded: false })

  private change = (checked: boolean, data: T, text: string) => {
    let inputText = ""
    const selectedOptions = this.selectedOptions;
    
    selectedOptions.forEach((s, i) => {
      inputText += s + ((i <= selectedOptions.length - 2) ? ", " : "")
    });
    
    this.setState({ text: inputText, writtingSearchCriteria: false, matches: [] }, () => {
      const onChange = this.props.onChange;

      if(onChange) 
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
          } as Props);

          labels.push(labelCheckbox)
        }
      }
    )

    return labels;
  }

  private onChangeInput = (e: any) => {
    // Next value.
    const nextValue: string = e.target.value ? e.target.value.trim() : "";
    let toDelete: string;

    this.setState(prevState => {
      // Prev value.
      const prevValue = prevState.text;

      // Selected options.
      const selectedOptions = this.selectedOptions;

      // Parts.
      const parts = nextValue.split(',');

      // Selected
      const selected = selectedOptions.join(", ");

      // Search criteria.
      const criteria = parts[parts.length - 1].trim();

      // Selected options length.
      const selectedOptionsLenght = selectedOptions.join().trim().length

      // Transforming data to evaluate.
      for(let i = 0 ; i < parts.length; i ++) 
        parts[i] = parts[i].trimLeft().trimRight();
      const partsJoin = parts.join()

      // Parts length.
      const partsLength = partsJoin.substr(0, partsJoin.length - 1).length

      // If there are nothing in prev value
      if (nextValue === "") {
        console.log(1)
        return { ...prevState, text: "", writtingSearchCriteria: false, matches: [] }
      }  

      // If criteria is valid.
      if (criteria.match("^[A-z0-9]+$")) {
        // Add criteria without selected options.
        if (selected.length === 0) {
          console.log(2);
          return {
            ...prevState,
            text: nextValue,
            writtingSearchCriteria: true,
            matches: this.search(criteria.toString())
          }
        }
        // Add a letter in criteria
        else if (selected.length > 0) {
          console.log(3);
          
          return {
            ...prevState,
            text: `${selected}, ${criteria}`,
            writtingSearchCriteria: true,
            matches: this.search(criteria.toString())
          }
        }
      }
      // If there are selected options and there are not criteria.
      // When there are no criteria
      else if (selected.length > 0 && parts.length > selectedOptions.length) {
        if (parts[parts.length - 1] === '' && prevState.writtingSearchCriteria) {
          console.log(4);
          
          return {
            ...prevState,
            text: selectedOptions.join(', ') + ', ',
            writtingSearchCriteria: false,
            matches: []
          }
        }
        // Delete an option.
        else if (parts[parts.length - 1] === '' && partsLength === selectedOptionsLenght) {
          console.log(5);
          
          const sliced = selectedOptions.slice(0, selectedOptions.length - 1);
          toDelete = sliced[sliced.length - 1];
          return {
            ...prevState,
            text: `${sliced.join(', ')}` + (sliced.length > 0 ? (", ") : ""),
          }
        }
      }

      return {
        ...prevState,
        text: prevValue,
        writtingSearchCriteria: partsLength !== selectedOptionsLenght ? false : true 
      }
    }, () => {
      if(toDelete && this.props.onDelete) {
        const labelCheckbox = this.extractOptions().find(o => o.children === toDelete);
        if(labelCheckbox) {
          const data = labelCheckbox.data;
          const text = labelCheckbox.children ? labelCheckbox.children.toString() : undefined;
          this.props.onDelete(false, data, text)
        }
      } 
    })
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

  private onFocusInput = () => {
    this.setState(prevState => {
      if (this.selectedOptions && !prevState.writtingSearchCriteria)
        return { text: prevState.text + ", " }
      else
        return { text: prevState.text }
    })

    return this.state.text === this.state.text;
  }

  private onBlurInput = () => {
    this.setState(prevState => {
      const textBefore = prevState.text;

      if (this.selectedOptions && !prevState.writtingSearchCriteria)
        return { text: textBefore.substr(0, textBefore.length - 2) }
      else
        return { text: prevState.text }
    })
  }

  private extractOptions = (): Array<LabelCheckboxProps<T>> => {
    const options: Array<LabelCheckboxProps<T>> = [];

    React.Children.forEach(this.props.children, (child: any) => {
      options.push(child.props);
    });

    return options;
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
            ref={this.inputRef}
            type="text"
            className="input-search"
            value={this.state.text}
            onFocus={this.onFocusInput}
            placeholder={this.props.defaultText}
            onBlur={this.onBlurInput}
            onClick={this.showCheckboxes}
            disabled={this.props.disabled}
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
