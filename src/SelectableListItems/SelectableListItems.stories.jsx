import React from 'react';
// get all the components listed in the index of exported components
import { SelectableListItems } from './SelectableListItems';
// import this dependency always to allow edition on the UI
import * as explorer from '../../../../.storybook/storyWithKnobs';

explorer.stories.add('SelectableListItems', function () {
    return (
        <div>
            <SelectableListItems
                handleItemClick={(e) => {
                    document.getElementById('output').innerText = e.target.innerText;
                }}
                cursor={explorer.types.number('Select a cursor position', 0)}
                items={[
                    {'displayValue': 'Seattle', 'value': 'SEATTLE'},
                    {'displayValue': 'Paris', 'value': 'PARIS'},
                    {'displayValue': 'London', 'value': 'LONDON'}
                ]}
                noMoreOptionsMessage={'The End!'}
            />
            <h1 id={'output'} />
            <p>Hover items to see styling. Click on one of them. Play with Knobs below. </p>
        </div>
    );
});
