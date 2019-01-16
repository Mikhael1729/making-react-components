import * as React from 'react';
import "styles/MultiSelect.css";
import LabelCheckbox, { LabelCheckboxProps } from './LabelCheckbox';

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
  selectedOptions: string[];
  text: string;
  writtingSearchCriteria: boolean;
  matches: string[]
  options: string[];
}

export default class MultiSelect<T> extends React.Component<
  MultiSelectProps<T>,
  MultiSelectState
  > {
  //#region Properties
  state: MultiSelectState = {
    expanded: false,
    selectedOptions: [],
    text: "",
    writtingSearchCriteria: false,
    options: [],
    matches: []
  };

  private titleRef: any = React.createRef();
  private checkboxesRef: any = React.createRef();
  private parentDivRef: any = React.createRef();
  private inputRef: any = React.createRef();
  //#endregion

  //#region Lifecycle Methods 
  componentWillMount() {
    this.updateOptions()
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
      this.setState({ selectedOptions: [] })
  }

  componentWillUnmount() {
    const parent = this.parentDivRef.current;
    window.removeEventListener("resize", this.changeSize)
    parent.removeEventListener("focusin", this.focusIn)
    parent.removeEventListener("focusout", this.focusOut)
  }

  componentDidUpdate(prevProps: MultiSelectProps<T>, prevState: MultiSelectState) {
    if (prevState.text !== this.state.text) {
      this.inputRef.current.selectionStart = this.inputRef.current.value.length;
      this.inputRef.current.selectionEnd = this.inputRef.current.value.length;
    }

    if(prevProps.children.length !== this.props.children.length)
      this.updateOptions()
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
    this.props.onChange ? this.props.onChange(checked, data, text) : null;

    this.setState(prevState => {
      const selectedOptions = [...prevState.selectedOptions]
      const index = selectedOptions.findIndex(l => l.toString() === text)
      let inputText = ""

      if (!checked)
        selectedOptions.splice(index, 1)
      else
        selectedOptions.push(text.toString())


      selectedOptions.forEach((s, i) => {
        const symbol = ", "
        inputText += s + ((i <= selectedOptions.length - 2) ? ", " : "")
      });

      return { selectedOptions, expanded: true, text: inputText, writtingSearchCriteria: false, matches: [] };
    });
  };

  private computeSelectedLetters = (): string | undefined => {
    let selectedLetters = this.props.defaultText;
    if (this.state.selectedOptions.length > 0) {
      selectedLetters = "";
      this.state.selectedOptions.forEach((text, index) => {
        selectedLetters +=
          text + (index < this.state.selectedOptions.length - 1 ? ", " : "")
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
          const match = this.state.selectedOptions.find(s => s === child.props.children.toString());

          // Cloning LabelCheckbox with props.
          const labelCheckbox = React.cloneElement(child, {
            key: index,
            onChange: this.change,
            checked: match ? true : false,
            pointer: true,
          } as Props);

          if (this.state.matches.length > 0) {
            const matchInSearch = this.state.matches.find(m => {
              return m === labelCheckbox.props.children.toString().toLowerCase()
            });
            if (matchInSearch) {
              labels.push(labelCheckbox);
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
    const nextValue: string = e.target.value.trim();
    this.setState(prevState => {
      const prevValue = prevState.text;
      const selectedOptions = [...prevState.selectedOptions];
      const parts = nextValue.split(',');
      const selected = selectedOptions.join(", ");
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
        return { ...prevState, text: "", writtingSearchCriteria: false, matches: [] }
      }  


      // If criteria is valid.
      if (criteria.match("^[A-z0-9]+$")) {
        // Add criteria without selected options.
        if (selected.length === 0) {
          return {
            ...prevState,
            text: nextValue,
            writtingSearchCriteria: true,
            matches: this.search(criteria.toString())
          }
        }
        // Add a letter in criteria
        else if (selected.length > 0) {
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
          return {
            ...prevState,
            text: selectedOptions.join(', ') + ', ',
            writtingSearchCriteria: false,
            matches: []
          }
        }
        // Delete an option.
        else if (parts[parts.length - 1] === '' && partsLength === selectedOptionsLenght) {
          const sliced = selectedOptions.slice(0, selectedOptions.length - 1);
          return {
            ...prevState,
            text: `${sliced.join(', ')}` + (sliced.length > 0 ? (", ") : ""),
            selectedOptions: sliced
          }
        }
      }

      return {
        ...prevState,
        text: prevValue,
        writtingSearchCriteria: partsLength !== selectedOptionsLenght ? false : true 
      }
    })
  }

  private search = (key: string): string[] => {
    const matches: string[] = [];
    this.state.options.forEach(option => {
      const match = option.toLowerCase().match(key.toLowerCase());

      if (match)
        if (match.input)
          matches.push(match.input);
    });

    return matches;
  }

  private onFocusInput = () => {
    this.setState(prevState => {
      if (prevState.selectedOptions.length > 0 && !prevState.writtingSearchCriteria)
        return { text: prevState.text + ", " }
      else
        return { text: prevState.text }
    })

    return this.state.text === this.state.text;
  }

  private onBlurInput = () => {
    this.setState(prevState => {
      const textBefore = prevState.text;

      if (prevState.selectedOptions.length > 0 && !prevState.writtingSearchCriteria)
        return { text: textBefore.substr(0, textBefore.length - 2) }
      else
        return { text: prevState.text }
    })
  }

  private canToShowDefaultText = (): boolean => {
    const { selectedOptions, matches, text } = this.state;

    if (selectedOptions.length === 0 && matches.length === 0 && text.length === 0)
      return true;
    else
      return false
  }

  updateOptions = () => {
    this.setState(prevState => {
      const selectedOptions = [...prevState.selectedOptions];
      const options = [] as string[];

      if(this.props.children.length > 0) {
        this.props.children.forEach((child: any) => {
          options.push(child.props.children.toString())
          if (child.props.checked)
            selectedOptions.push(child.props.children.toString())
        })
      }

      return { selectedOptions, options, text: selectedOptions.join(", ") }
    })
  }

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
