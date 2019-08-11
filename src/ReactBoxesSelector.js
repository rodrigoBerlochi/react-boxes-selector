import React, { Component, createRef } from 'react';
import findIndex from 'lodash.findindex';
import { func, arrayOf, shape, string, number, bool } from 'prop-types';
// https://github.com/kentor/react-click-outside
import enhanceWithClickOutside from 'react-click-outside';
// https://github.com/JedWatson/react-input-autosize/
import AutosizeInput from 'react-input-autosize';
import { debounce } from './utils';

import { BoxList } from './BoxList/BoxList';
import { FloatingOverlay } from './FloatingOverlay/FloatingOverlay';
import { SelectableListItems } from './SelectableListItems/SelectableListItems';
import { getStyles, CompoundedInput } from './ReactBoxesSelector.styles';

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
        onSelect: func, // pass a callback to read current selected items on each select/unselect event
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
        isDisabled: false,
        tagMaxWordLength: 12,
    }

    inputRef = createRef();

    overlayRef = createRef();

    compoundedInput = createRef();

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

    componentDidUpdate () {
        const input = this.compoundedInput.current;
        input.scrollTop = input.scrollHeight || 1000;
    }

    componentDidMount () {
        const { chosenItems } = this.props;
        
        if (!!chosenItems.length) {
            this.setState({
                selectedItems: [...chosenItems]
            });
        }
    }
    /**
     * 
     * @description On writting updates internal state
     * @param {Object} event
     * @returns {Undefined}
     */
    handleInputChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };
    /**
     * @description Add clicked item to the list of selected items
     * @param {Object} event
     * @returns {Undefined}
     */
    handleOptionClick = (event) => {
        const { menuItems } = this.props;
        const { selectedItems } = this.state;

        const selectedItem = menuItems.filter((el) => {
            return event.target.innerText === el.displayValue;
        });

        const selectedList = [...selectedItems, ...selectedItem];
        this.manageSelectedItems(selectedList);
    }
    /**
     * @description remove a selected item from the list of selections
     * @param {String} value
     * @returns {Undefined} 
     */
    handleTagRemove = (value) => {
        const { selectedItems } = this.state;

        if (value === '') {
            return;
        }

        const selectedList = selectedItems.filter((item) => {
            return item.displayValue !== value;
        });

        this.manageSelectedItems(selectedList, false);
    }
    /**
     * @description Enter event triggered on the input must select the option
     * as well as a cursor click event
     * @param {Object} event
     * @param {Array} options
     * @returns {Undefined}
     */
    handleInputEnter = (event, options) => { // TODO maybe a medium layer that manage key events?
        const {
            isOpen,
            cursor,
            selectedItems,
        } =  this.state;

        if (!isOpen) {
            this.setState({ isOpen: true });
        }

        if (event.key !== 'Enter') {
            return;
        }

        // user navigated by arrow keys, select current option
        if (cursor !== 0) {
            const selectedList = Array.prototype.concat(selectedItems, options[cursor - 1]);
            this.manageSelectedItems(selectedList);
            return;
        }

        // typeahead reduced list to just 1 item and user press enter, select this option
        if (options.length === 1) {
            const selectedList = Array.prototype.concat(selectedItems, options);
            this.manageSelectedItems(selectedList);
        }
    }
    /**
     * @description Actually updating selected list, and leaving search input ready for a next term
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
     * @description Enabled control opens dropdown when get focus
     * @returns {Undefined}
     */
    handleInputFocus  = () => {
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
    handleClickOutside = () => {
        this.closeDropDown();
    }
    /**
     * @description Arrow key support. Up/down modify 'cursor' value, increasin or decreasing it.
     * When we are at the top/bottom boundaries of the list, we can jump to the opposite item
     * to create a continue navigation flow (eg: you get last one and press down, you jump to the very first item)
     * @param {Object} event
     * @param {Array} options
     * @returns {Undefined}
     */
    handleArrowNavigation = (event, options) => {
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
     * @description When jumping from arrow navigation to mouse nav, 
     * it remove highlighted items by arrows, handling over cursor events
     * @returns {Undefined}
     */
    switchToMouseNavigation = (position) => {
        this.setState({ cursor: position });
    };
    /**
     * @description Close overlay after navigating out of it by Tab
     * @param {Object} event
     * @returns {Undefined} 
     */
    handleTab = (event) => {
        if (event.key === 'Tab') {
            this.setState({ isOpen: false });
        }
    }
    /**
     * @description As part of the simulated input, click on wrapper should
     * behave as click on real input
     * @returns {Undefined}
     */
    catchFocusIntent = () => {
        this.setFocusToInput();
    }
    /**
     * @returns {Undefined}
     */
    closeDropDown = () => {
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
    cleanInput = () => {
        this.setState({ searchTerm: '' });
    }
    /**
     * @returns {Array<object>}
     */
    getOptions(searchTerm, menuItems, selectedItems) {
        // move out to a method all next stuff, break into smaller single resp functions
        const regX = new RegExp(searchTerm, 'i');

        return menuItems.filter((availableOption) => {
            // remove elements already selected
            // available options mustn't include
            return findIndex(selectedItems, (o) => {
                return o.value === availableOption.value;
            }) === -1;
        }).filter((item) => {
            // remove elements not matching search term
            return searchTerm.length === 0 ? true : regX.test(item.displayValue);
        });
    }
    /**
     * @returns {Object} React element
     */
    render () {
        const { 
            searchTerm, 
            selectedItems, 
            isOpen, 
            cursor 
        } = this.state;

        const { 
            menuItems, 
            placeholder, 
            noMoreOptionsMessage, 
            maxLinesVisible, 
            tagMaxWordLength, 
            isDisabled 
        } = this.props;

        const options = this.getOptions(searchTerm, menuItems, selectedItems);

        return (
            <div data-name="ReactBoxesSelector" style={styles.widget}>
                <CompoundedInput
                    disabled={isDisabled}
                    style={{ ...styles.compoundedInput, ...{maxHeight: (28 * maxLinesVisible)} }}
                    onClick={this.catchFocusIntent}
                    ref={this.compoundedInput}
                >
                    <BoxList
                        items={selectedItems}
                        handleTagClick={this.handleTagRemove}
                        maxWordLength={tagMaxWordLength}
                    />
                    <AutosizeInput
                        inputStyle={isDisabled ? {...styles.autoSize, ...styles.bgWhite} : styles.autoSize}
                        disabled={isDisabled}
                        style={{float: 'left'}}
                        value={searchTerm}
                        onChange={this.handleInputChange}
                        ref={this.inputRef}
                        onKeyPress={(event) => {
                            this.handleInputEnter(event, options);
                        }}
                        onKeyDown={(event) => {
                            this.handleArrowNavigation(event, options);
                            this.handleTab(event);
                        }}
                        onFocus={this.handleInputFocus}
                        placeholder={placeholder}
                    />
                </CompoundedInput>
                <FloatingOverlay
                    shouldOpen={isOpen}
                    overlayRef={this.overlayRef}
                >
                    <SelectableListItems
                        items={options}
                        cursor={cursor}
                        handleItemClick={this.handleOptionClick}
                        noMoreOptionsMessage={noMoreOptionsMessage}
                        switchToMouseNavigation={this.switchToMouseNavigation}
                    />
                </FloatingOverlay>
            </div>
        );
    }
}

export default enhanceWithClickOutside(ReactBoxesSelector);
