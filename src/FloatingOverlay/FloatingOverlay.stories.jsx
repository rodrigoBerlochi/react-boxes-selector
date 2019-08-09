import React from 'react';
// get all the components listed in the index of exported components
import { FloatingOverlay } from './FloatingOverlay';
// import this dependency always to allow edition on the UI
import * as explorer from '../../../../.storybook/storyWithKnobs';

explorer.stories.add('Overlay floating over external content', function () {
    return (
        <div style={{width: 300, position: 'relative'}}>
            <FloatingOverlay
                shouldOpen={explorer.types.boolean('Show overlay?', true)}
            >
                Overlay with functionality to open and close itself. It has shadow and auto scroll-y.
                You can place inside text or React elements.
                Content inside is absolutely responsible for its own styles and behavior.
                ### Do not forget to set position relative to the parent ###
            </FloatingOverlay>
            <div>
            Whether you’re driving decisions across your organization or embedding insights into your software, app, or website – choose the analytics software that works the way people think.
            Read more at https://www.tableau.com/#QbylEzZhKrBOBsjH.99
            </div>
        </div>
    );
});
