import React from 'react';
import { shallow } from 'enzyme';

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({
    content_elements: [
      {
        caption: 'my cool caption',
        subtitle: 'my cool subtitle',
      },
    ],
  })),
}));

jest.mock('@arc-test-org/engine-theme-sdk', () => ({
  Gallery: (props, children) => <div {...props}>{ children }</div>,
}));

describe('the custom content gallery', () => {
  it('should call useContent with the expected content config values', () => {
    const { default: CustomContentGallery } = require('./custom-content');
    const { useContent } = require('fusion:content');

    shallow(<CustomContentGallery contentConfig={{ contentService: 'cool-api', contentConfigValues: 'cool-config' }} />);
    expect(useContent.mock.calls).toHaveLength(1);
    expect(useContent.mock.calls[0]).toHaveLength(1);
    expect(useContent.mock.calls[0][0]).toStrictEqual({ query: 'cool-config', source: 'cool-api' });
  });

  describe('when there is gallery data returned by the fetch', () => {
    it('should use the gallery data supplied by the fetch', () => {
      const { default: CustomContentGallery } = require('./custom-content');

      const wrapper = shallow(<CustomContentGallery contentConfig={{ contentService: 'cool-api', contentConfigValues: 'cool-config' }} />);
      expect(wrapper.find('Gallery').props()).toStrictEqual(
        {
          galleryElements: [
            {
              caption: 'my cool caption',
              subtitle: 'my cool subtitle',
            },
          ],
        },
      );
    });
  });

  describe('when there is gallery data returned by the fetch', () => {
    it('should load content from global content', () => {
      const { default: CustomContentGallery } = require('./custom-content');
      const { useContent } = require('fusion:content');
      useContent.mockReturnValue(null);

      const wrapper = shallow(<CustomContentGallery contentConfig={{ contentService: 'cool-api', contentConfigValues: 'cool-config' }} />);
      expect(wrapper.find('Gallery').props()).toStrictEqual(
        {
          galleryElements: [],
        },
      );
    });
  });
});