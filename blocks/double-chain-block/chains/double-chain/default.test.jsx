import React from 'react';
import { shallow } from 'enzyme';
import DoubleChain from './default';

describe('double chain', () => {
  const Comp1 = () => <div>1</div>;
  const Comp2 = () => <div>2</div>;
  const Comp3 = () => <div>3</div>;
  const Comp4 = () => <div>4</div>;
  it('should only render if there are children', () => {
    const component = shallow(
      <DoubleChain />,
    );
    expect(component.type()).toBeNull();
  });
  it('should put all features into the first column by default', () => {
    const customFields = {};
    const component = shallow(
      <DoubleChain customFields={customFields}>
        <Comp1 />
        <Comp2 />
        <Comp3 />
        <Comp4 />
      </DoubleChain>,
    );
    expect(component.find('.column-1').children().length).toBe(4);
    expect(component.find('.column-2').children().length).toBe(0);
  });
  it('should be able to accept a number in the custom field, and that number of features within the chain should appear in the first column. ', () => {
    const customFields = { columnOne: 2 };
    const component = shallow(
      <DoubleChain customFields={customFields}>
        <Comp1 />
        <Comp2 />
        <Comp3 />
        <Comp4 />
      </DoubleChain>,
    );

    const column1 = component.find('.column-1');

    expect(column1.children().length).toBe(2);
  });
  it('should be able to accept a number in the custom field, any additional features in the chain should be placed in the second column. ', () => {
    const customFields = { columnOne: 1 };
    const component = shallow(
      <DoubleChain customFields={customFields}>
        <Comp1 />
        <Comp2 />
        <Comp3 />
        <Comp4 />
      </DoubleChain>,
    );

    const column2 = component.find('.column-2');

    expect(column2.children().length).toBe(3);
  });
});
