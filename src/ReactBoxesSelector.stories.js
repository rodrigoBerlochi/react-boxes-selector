import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';

import BoxesSelector from './ReactBoxesSelector';

const ProgrammingLanguages = [
  {
    displayValue: 'Perl',
    value: '001'
  },
  {
    displayValue: 'Ruby',
    value: '002'
  },
  {
    displayValue: 'Python',
    value: '003'
  },
  {
    displayValue: 'Javascript',
    value: '004'
  },
  {
    displayValue: 'Java',
    value: '005'
  },
  {
    displayValue: 'Scala',
    value: '006'
  },
  {
    displayValue: 'C#',
    value: '007'
  },
  {
    displayValue: 'Haskell',
    value: '008'
  },
  {
    displayValue: 'Eiffel',
    value: '009'
  },
  {
    displayValue: 'Android',
    value: '010'
  },
  {
    displayValue: 'Objective-C',
    value: '011'
  },
];

storiesOf('React Box Selector', module)
  .add('basic usage', () => (
    <div style={{ padding: 50 }}>
          <BoxesSelector 
            menuItems={ProgrammingLanguages}
          />
    </div>
  ));