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
  //#endregion

  //#region Lifecycle Methods 
  componentWillMount() {
    this.setState(prevState => {
      const selectedOptions = [...prevState.selectedOptions];
      const options = [] as string[];

      this.props.children.forEach((child: any) => {
        options.push(child.props.children)
        if(child.props.checked) 
          selectedOptions.push(child.props.children)
      })

      return { selectedOptions, options }
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
      this.setState({ selectedOptions: [] })
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
      const selectedOptions = [...prevState.selectedOptions]
      const index = selectedOptions.findIndex(l => l === text)
      let inputText = ""

      if (!checked)
        selectedOptions.splice(index, 1)
      else
        selectedOptions.push(text)


      selectedOptions.forEach((s, i) => {
        const symbol = ", "
        inputText += s + ((i <= selectedOptions.length - 2) ? ", " : "")
      });

      return { selectedOptions, expanded: true, text: inputText, writtingSearchCriteria: false };
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

          labels.push(labelCheckbox);
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

      console.log('nextValue:', nextValue)
      console.log('prevValue:', prevValue)
      console.log('selectedOptions:', selectedOptions)
      console.log('parts:', parts)
      console.log('selected:', selected)
      console.log('criteria:', criteria)

      // If there are nothing in prev value
      if (nextValue === "") {
        console.log('5')
        return { ...prevState, text: "", writtingSearchCriteria: false, matches: []}
      }



      // If criteria is valid.
      if (criteria.match("^[A-z0-9]+$")) {
        // Add criteria without selected options.
        if (selected.length === 0) {
          
          console.log('4')
          return { 
            ...prevState, 
            text: nextValue, 
            writtingSearchCriteria: true,
            matches: this.search(criteria)
          }
        }
        // Add a letter in criteria
        else if (selected.length > 0) {
          console.log('3')
          return { 
            ...prevState, 
            text: `${selected}, ${criteria}`, 
            writtingSearchCriteria: true,
            matches: this.search(criteria) }
        }
      }
      // If there are selected options and there are not criteria.
      // When there are no criteria
      else if (selected.length > 0 && parts.length > selectedOptions.length) {
        if (parts[parts.length - 1] === '' && prevState.writtingSearchCriteria) {
          console.log('2')
          return { 
            ...prevState, 
            text: selectedOptions.join(', ') + ', ', 
            writtingSearchCriteria: false,
            matches: [] }
        }
        // Delete an option.
        else if (parts[parts.length - 1] === '') {
          console.log('1')
          const sliced = selectedOptions.slice(0, selectedOptions.length - 1);
          return {
            ...prevState,
            text: `${sliced.join(', ')}` + (sliced.length > 0 ? (", ") : ""),
            selectedOptions: sliced
          }
        }
      }

      console.log('final')
      return {
        ...prevState,
        text: prevValue,
        writtingSearchCriteria: true
      }
    })
  }

  private search = (key: string): string[] => {
    const matches: string[] = [];
    this.state.options.forEach(option => {
      const match = option.toLowerCase().match(key.toLowerCase());
      console.log(option)
      console.log(key);
      console.log(match)

      if(match) 
        if(match.input)
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
            onFocus={this.onFocusInput}
            onBlur={this.onBlurInput}
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
