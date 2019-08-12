const assert = require('assert');

const storybookURL = 'http://localhost:6006/?path=/story/react-box-selector--basic-usage';

before(function() {
    browser.url(storybookURL);
    browser.switchToFrame($('#storybook-preview-iframe'));
});

/**
 * At this point next text are not isolated between each other. Since they are testing 
 * the same component and it is small enough, this approach replicates a complete flow
 * a user can have interacting with the component. 
 */
describe('React Boxes Selector', () => {
    it('should filter options based on typing and perform a selection on clicking', () => {
        // type a value to search
        $('[data-testid="hidden-input"]').setValue('Ruby');
        // options are filter to show only those matching type string, here it is only one
        // matching Ruby
        const optLength = $$('[data-testid="item-list"] li').length;
        assert.equal(optLength, 1);

        $('[data-testid="item-list"] li').click();
        // now we should have 2 selected options, the preselected and the one we just clicked
        const selected = $$('[data-testid="selected-item"]');
        assert.equal(selected.length, 2);
    });

    it('should perform a selection without filtering by typed text', () => {
        $('[data-testid="hidden-input"]').click();
        const options = $$('[data-testid="item-list"] li');
        options[0].click();

        // now we should have 3 selected options, the preselected and the one we just clicked
        const selected = $$('[data-testid="selected-item"]');
        assert.equal(selected.length, 3);
    });

    it('should remove an item on clicking the remove icon', () => {
        // grab the first item selected 
        const firstSelected = $$('[data-testid="selected-item"]')[0];
        // check the close icon is present for it
        firstSelected.$('#Python').isDisplayed();
        // click the button
        firstSelected.$('#Python').click();
        // now double check we have an items less than before
        const selected = $$('[data-testid="selected-item"]');
        assert.equal(selected.length, 2);
    });
});