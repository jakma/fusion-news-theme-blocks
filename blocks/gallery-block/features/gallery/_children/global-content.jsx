import React from 'react';
import { useAppContext } from 'fusion:context';
import { Gallery } from '@arc-test-org/engine-theme-sdk';

const GlobalContentGallery = () => {
  const { globalContent: { content_elements: contentElements = [] } = {} } = useAppContext();

  return <Gallery galleryElements={contentElements} />;
};

export default GlobalContentGallery;