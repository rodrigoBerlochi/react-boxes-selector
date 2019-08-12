# react-boxes-selector

React Boxes Selector is a React multi-select component. It displays a single input with an optional placeholder. On focus, a dropdown is shown below it, with a list of options to be selected. User can navigate the options using arrow keys or mouse/scrolling. Press enter or click on an item to select it. The selected item is now displayed inside the input, as a box/pill/tag with a close icon. The control allows for selections of multiple options and can show a message when every option has been selected. 

Boxes Selector can receive a prop with the list of preselected options (for example, when options are saved from a previous session). 

The component is a work in progress and it is also a playground where I can experiment things. 

## Usage

Supported properties:

```javascript
        onReset: func
        onSelect: func // pass a callback to read current selected items on each select/unselect event
        menuItems: arrayOf(shape({
            displayValue: string,
            value: string
        }))
        chosenItems: arrayOf(shape({
            displayValue: string,
            value: string
        }))
        placeholder: string
        noMoreOptionsMessage: string
        maxLinesVisible: number
        tagMaxWordLength: number
        isDisabled: bool
```

```
import BoxesSelector from 'ReactBoxesSelector';
```

Test it running: npm run storybook