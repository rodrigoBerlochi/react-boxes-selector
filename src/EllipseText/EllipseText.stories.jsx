import React from 'react';
// get all the components listed in the index of exported components
import { EllipseText } from './EllipseText';
// import this dependency always to allow edition on the UI
import * as explorer from '../../../../.storybook/storyWithKnobs';

explorer.stories.add('Ellipse children text', function () {
    return (
        <div>
            <EllipseText length={explorer.types.number('Length', 12)}>
                {explorer.types.text('Text to transform', 'Hello World, Tableau is best way to understand your data')}
            </EllipseText>
            <p>Hover the ellipsed text to see the overlay</p>
        </div>
    );
});
