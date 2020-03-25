import React from 'react';
import { mount, shallow } from 'enzyme';
import SectionNav from './section-nav';

const items = [
  {
    _id: '/sports',
    node_type: 'section',
    name: 'Sports',
    children: [
      {
        _id: 'foo',
        node_type: 'link',
        display_name: 'Basketball',
        url: '/basketball',
      },
      {
        _id: 'bar',
        node_type: 'link',
        display_name: 'Dodgeball',
        url: '/dodgeball',
      },
    ],
  },
  {
    _id: 'bar',
    node_type: 'link',
    display_name: 'Entertainment',
    url: '/entertainment',
  },
  {
    _id: '/some-inactive-section',
    inactive: true,
    node_type: 'section',
    name: 'Some Inactive Section',
  },
];

describe('the SectionNav component', () => {
  it('should render a .section-menu list', () => {
    const wrapper = shallow(<SectionNav />);

    expect(wrapper.find('ul.section-menu')).toHaveLength(1);
  });

  it('should render the correct number of active .section-item elements', () => {
    const wrapper = mount(<SectionNav sections={items} />);
    const numActiveItems = items.filter((i) => !i.inactive).length;

    expect(wrapper.find('li.section-item')).toHaveLength(numActiveItems);
  });

  it('should render the text for a section node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item > a').at(0)).toIncludeText('Sports');
  });

  it('should render the href for a section node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item > a').at(0)).toHaveProp('href', '/sports');
  });

  it('should render the text for a link node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item > a').at(1)).toIncludeText('Entertainment');
  });

  it('should render the href for a link node correctly', () => {
    const wrapper = mount(<SectionNav sections={items} />);

    expect(wrapper.find('li.section-item > a').at(1)).toHaveProp('href', '/entertainment');
  });

  describe('when a section has child nodes', () => {
    it('should render a .submenu-caret element inside the anchor tag', () => {
      const wrapper = mount(<SectionNav sections={items} />);

      expect(wrapper.find('li.section-item > a > span.submenu-caret').at(0)).toHaveLength(1);
    });

    it('should render a .subsection-container', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const numSubsectionContainers = items.filter((i) => i.children && i.children.length).length;

      expect(wrapper.find('.subsection-container')).toHaveLength(numSubsectionContainers); // one of the 3 items is inactive
    });

    it('should render the correct number of active .subsection-item elements', () => {
      const wrapper = mount(<SectionNav sections={items} />);
      const numActiveSubItems = items[0].children.length;

      expect(wrapper.find('.subsection-container').at(0).find('li.subsection-item')).toHaveLength(numActiveSubItems);
    });

    it('should render the text for a subsection link node correctly', () => {
      const wrapper = mount(<SectionNav sections={items} />);

      expect(wrapper.find('.subsection-container').at(0).find('li.subsection-item > a').at(0)).toIncludeText('Basketball');
    });

    it('should render the href for a subsection link node correctly', () => {
      const wrapper = mount(<SectionNav sections={items} />);

      expect(wrapper.find('.subsection-container').at(0).find('li.subsection-item > a').at(0)).toHaveProp('href', '/basketball');
    });
  });
});