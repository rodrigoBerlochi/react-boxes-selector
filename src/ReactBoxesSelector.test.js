import React from 'react';
import { cleanup, render, fireEvent, wait, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import BoxesSelector from './ReactBoxesSelector';

afterEach(cleanup);

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
];

describe('React Boxes Selector', () => {
    test('Should match snapshot', () => {
        const { container } = render(
            <BoxesSelector 
                onReset={() => {}}
                menuItems={ProgrammingLanguages}
                chosenItems={[
                {
                    displayValue: 'Python',
                    value: '003'
                }
                ]}
                placeholder={'Choose your languages'}
                noMoreOptionsMessage={'You\'ve chosen everything we have for you!'}
                maxLinesVisibe={2}
                tagMaxWordLength={8}
                isDisabled={false}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Should render correctly props after mounting', () => {
      const { 
        container, 
        getByPlaceholderText, 
        getByTestId,
        getByText,
      } = render(
          <BoxesSelector 
              onReset={() => {}}
              menuItems={ProgrammingLanguages}
              chosenItems={[
              {
                  displayValue: 'Python',
                  value: '003'
              }
              ]}
              placeholder={'Choose your languages'}
              noMoreOptionsMessage={'You\'ve chosen everything we have for you!'}
              maxLinesVisibe={2}
              tagMaxWordLength={8}
              isDisabled={false}
          />
      );

      expect(getByPlaceholderText('Choose your languages')).toBeInTheDocument();
        
      expect(getByTestId('selected-items')).toBeInTheDocument();

      // chosenItems has been rendered into the selected items area
      expect(container.querySelector('li span').innerHTML).toMatch('Python');
      
      // menuItems is rendered in the option list, and already selected item has been removed
      expect(getByTestId('item-list').querySelectorAll('li')).toHaveLength(2);
      
      expect(getByText('Perl')).toBeInTheDocument();

      expect(getByText('Ruby')).toBeInTheDocument();
  });
});