import React from 'react';
// get all the components listed in the index of exported components
import { TagList } from './TagList';
// import this dependency always to allow edition on the UI
import * as explorer from '../../../../.storybook/storyWithKnobs';

explorer.stories.add('Tag List', function () {
    return (
        <div>
            <TagList items={[
                {'displayValue': 'Seattle', 'value': 'SEATTLE'},
                {'displayValue': 'Paris', 'value': 'PARIS'},
                {'displayValue': 'London', 'value': 'LONDON'},
                {'displayValue': 'Amsterdam', 'value': 'AMSTERDAM'},
                {'displayValue': 'Berlin', 'value': 'BERLIN'}
            ]} handleTagClick={() => {}}
            />
        </div>
    );
});
