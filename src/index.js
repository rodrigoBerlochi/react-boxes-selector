import findIndex from 'lodash.findindex';
import { func, arrayOf, shape, string, number, bool } from 'prop-types';
import React, { Component } from 'react';
// https://github.com/kentor/react-click-outside
import enhanceWithClickOutside from 'react-click-outside';
// https://github.com/JedWatson/react-input-autosize/
import AutosizeInput from 'react-input-autosize';


import { TagList } from './TagList/TagList';
import { FloatingOverlay } from './FloatingOverlay/FloatingOverlay';
import { SelectableListItems } from './SelectableListItems/SelectableListItems';

import { getStyles, InputX } from './styles';

const styles = getStyles();

/**
 * ReactBoxesSelector
 * @returns {Object} React element
 */
class ReactBoxesSelector extends Component {
    // to change: manage selected internally. it should be internal state. keep a prop-func to apply some kind of processing
    // but we dont want to depend on Redux and actions to know which are the menuitems afeter select some of option
    static propTypes = {
        onReset: func,
        onSelect: func,
        menuItems: arrayOf(shape({
            displayValue: string,
            value: string,
        })),
        chosenItems: arrayOf(shape({
            displayValue: string,
            value: string,
        })),
        placeholder: string,
        noMoreOptionsMessage: string,
        maxLinesVisible: number,
        tagMaxWordLength: number,
        isDisabled: bool,
    }

    static defaultProps = {
        menuItems: [],
        chosenItems: [],
        onReset: () => {},
        onSelect: (val) => { console.log(val); },
        maxLinesVisible: 2,
        isDisabled: false
    }

    /**
     * @param {Object} nextProps
     * @param {Object} prevState
     * @returns {Null | Object} new state
     */
    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.chosenItems !== prevState.selectedItems) {
            return {
                selectedItems: nextProps.chosenItems
            };
        }

        return null;
    }

    initialState = {
        searchTerm: '',
        isOpen: false,
        selectedItems: [],
        cursor: 0
    }

    state = this.initialState;

    reset = () => {
        this.setState(this.initialState, () => {
            this.props.onReset(this.state); // option to communicate outside a reset flow
        });
    }

    inputRef = React.createRef();

    overlayRef = React.createRef();

    inputXRef = React.createRef();

    componentDidUpdate () {
        const inputXLines = this.inputXRef.current.scrollHeight;
        this.inputXRef.current.scrollTop = inputXLines || 1000;
    }
    /**
     * 
     * @param {Object} event
     * @returns {Undefined}
     */
    handleInputChange (event) {
        this.setState({ searchTerm: event.target.value });
    }
    /**
     * 
     * @param {Object} event
     * @returns {Undefined}
     */
    handleOptionClick (event) {
        const selectedItem = this.props.menuItems.filter((el) => {
            return event.target.innerText === el.displayValue;
        });

        const selectedList = Array.prototype.concat(this.state.selectedItems, selectedItem);
        this.manageSelectedItems(selectedList);
    }
    /**
     * 
     * @param {String} value
     * @returns {Undefined} 
     */
    handleTagRemove (value) {
        if (value === '') {
            return;
        }
        const selectedList = this.state.selectedItems.filter((item) => {
            return item.displayValue !== value;
        });

        this.manageSelectedItems(selectedList, false);
    }
    /**
     * 
     * @param {Object} event
     * @param {Array} options
     * @returns {Undefined}
     */
    handleInputEnter (event, options) { // TODO maybe a medium layer that manage key events?
        if (!this.state.isOpen) {
            this.setState({ isOpen: true });
        }

        if (event.key !== 'Enter') {
            return;
        }

        // user navigated by arrow keys
        if (this.state.cursor !== 0) {
            const selectedList = Array.prototype.concat(this.state.selectedItems, options[this.state.cursor - 1]);
            this.manageSelectedItems(selectedList);
            return;
        }

        // typeahead reduced list to just 1 item
        if (options.length === 1) {
            const selectedList = Array.prototype.concat(this.state.selectedItems, options);
            this.manageSelectedItems(selectedList);
        }
    }
    /**
     * 
     * @param {Array} selectedList
     * @param {Boolean} shouldResetInput
     * @returns {Undefined}
     */
    manageSelectedItems (selectedList, shouldResetInput = true) {
        this.setState(() => {
            return { selectedItems: selectedList, cursor: 0 };
        }, this.props.onSelect(selectedList)); // by default, logs updated selection. 
        // But you should pass into this prop a callback that send selected items outside the widget
        // to your state management system
        if (shouldResetInput) {
            this.setFocusToInput();
            this.cleanInput();
        }
    }
    /**
     * @returns {Undefined}
     */
    handleInputFocus () {
        if (this.props.isDisabled) {
            return;
        }
        this.setState({ isOpen: true });
    }
    /**
     * react-click-outside mandatory method
     * don't change its name
     * @returns {Undefined}
     */
    handleClickOutside () {
        this.closeDropDown();
    }
    /**
     * @param {Object} event
     * @param {Array} options
     * @returns {Undefined}
     */
    handleArrowNavigation (event, options) {
        const overlay = this.overlayRef.current;
        switch (event.key) {
            case 'ArrowDown':
                this.setState(({cursor}) => {
                    overlay.scrollTop = (cursor === options.length) ? 0 : (cursor * 20);
                    return { cursor: cursor === options.length ? 1 : ++cursor };
                });
                break;
            case 'ArrowUp':
                this.setState(({cursor}) => {
                    overlay.scrollTop = (cursor === 1) ? (options.length * 20) : (overlay.scrollTop - 20);
                    return { cursor: cursor === 1 ? options.length : --cursor };
                });
                break;
            // default: do nothing
        }
    }
    /**
     * @description Close overlay after navigating out of it by Tabs
     * @param {Object} event
     * @returns {Undefined} 
     */
    handleTab (event) {
        if (event.key === 'Tab') {
            this.setState({ isOpen: false });
        }
    }
    /**
     * @description part of simulated input, click on wrapper should
     * behave as click on real input
     * @returns {Undefined}
     */
    catchFocusIntent () {
        this.setFocusToInput();
    }
    /**
     * @returns {Undefined}
     */
    closeDropDown () {
        this.setState({ isOpen: false, cursor: 0 });
    }
    /**
     * @returns {Undefined}
     */
    setFocusToInput () {
        this.inputRef.current.focus(); // TODO see issues if it opens the dropdown when we dont need it opened
    }
    /**
     * @returns {Undefined}
     */
    cleanInput () {
        this.setState({ searchTerm: '' });
    }
    /**
     * @returns {Object} React element
     */
    render () {
        const { searchTerm, selectedItems, isOpen, cursor } = this.state;
        const { menuItems, placeholder, noMoreOptionsMessage, maxLinesVisible, tagMaxWordLength, isDisabled } = this.props;

        const regX = new RegExp(searchTerm, 'i');

        const options = menuItems.filter((item) => {
            // remove elements already selected
            return findIndex(selectedItems, (o) => {
                return o.value === item.value;
            }) === -1;
        }).filter((item) => {
            // remove elements not matching search term
            return searchTerm.length === 0 ? true : regX.test(item.displayValue);
        });

        return (
            <div data-name="ReactBoxesSelector" style={styles.widget}>
                <InputX className="wdc-composed-input"
                    disabled={isDisabled}
                    style={{ ...styles.inputX, ...{maxHeight: (28 * maxLinesVisible)} }}
                    onClick={() => { this.catchFocusIntent(); }}
                    innerRef={this.inputXRef}
                >
                    <TagList
                        items={selectedItems}
                        handleTagClick={(event) => {
                            this.handleTagRemove(event);
                        }}
                        maxWordLength={tagMaxWordLength}
                    />
                    <AutosizeInput
                        inputStyle={isDisabled ? {...styles.autoSize, ...styles.bgWhite} : styles.autoSize}
                        disabled={isDisabled}
                        style={{float: 'left'}}
                        value={searchTerm}
                        onChange={(event) => {
                            this.handleInputChange(event);
                        }}
                        ref={this.inputRef}
                        onKeyPress={(event) => {
                            this.handleInputEnter(event, options);
                        }}
                        onKeyDown={(event) => {
                            this.handleArrowNavigation(event, options);
                            this.handleTab(event);
                        }}
                        onFocus={() => {
                            this.handleInputFocus();
                        }}
                        placeholder={placeholder}
                    />
                </InputX>
                <FloatingOverlay
                    shouldOpen={isOpen}
                    overlayRef={this.overlayRef}
                >
                    <SelectableListItems
                        items={options}
                        cursor={cursor}
                        handleItemClick={(event) => {
                            this.handleOptionClick(event);
                        }}
                        noMoreOptionsMessage={noMoreOptionsMessage}
                    />
                </FloatingOverlay>
            </div>
        );
    }
}

export default enhanceWithClickOutside(ReactBoxesSelector);
