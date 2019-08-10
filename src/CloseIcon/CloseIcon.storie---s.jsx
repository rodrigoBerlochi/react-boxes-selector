import React from 'react';
// get all the components listed in the index of exported components
import { CloseIcon } from './CloseIcon';
// import this dependency always to allow edition on the UI
import * as explorer from '../../../../.storybook/storyWithKnobs';

explorer.stories.add('Close Icon', function () {
    return (
        <div style={{width: 25, float: 'left'}}>
            <CloseIcon
                handleClick={(e) => {
                    console.log(e);
                }}
            />
        </div>
    );
});
