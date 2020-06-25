import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import Byline from '@wpmedia/byline-block';
import ArticleDate from '@wpmedia/date-block';
import getProperties from 'fusion:properties';

import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';
import { ratiosPropsFor } from '../shared/helper';

// via results list
const MediumListItem = (props) => {
  const {
    websiteURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    displayDate,
    id,
    customFields,
    arcSite,
    resizedImageOptions,
    targetFallbackImage,
    placeholderResizedImageOptions,
    imageRatio,
  } = props;
  const showSeparator = by && by.length !== 0 && customFields.showDateMD;
  const textClass = customFields.showImageMD ? 'col-sm-12 col-md-xl-8 flex-col' : 'col-sm-xl-12 flex-col';

  const headlineTmpl = () => {
    if (customFields.showHeadlineMD && itemTitle !== '') {
      return (
        <a href={websiteURL} title={itemTitle} className="md-promo-headline">
          <Title className="md-promo-headline" primaryFont={primaryFont}>{itemTitle}</Title>
        </a>
      );
    }
    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescriptionMD) {
      return (
        <DescriptionText secondaryFont={primaryFont} className="description-text">
          {descriptionText}
        </DescriptionText>
      );
    }
    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showBylineMD) {
      return (
        <>
          {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
          {/* The Separator will only be shown if there is at least one author name */}
          {showSeparator && <p className="dot-separator">&#9679;</p>}
        </>
      );
    }
    return null;
  };

  const dateTmpl = () => {
    if (customFields.showDateMD && displayDate) {
      return (
        <>
          <ArticleDate date={displayDate} />
        </>
      );
    }
    return null;
  };

  const ratios = ratiosPropsFor('MD', imageRatio);

  return (
    <article className="container-fluid medium-promo" key={id}>
      <div className="row med-promo-padding-bottom">
        {customFields.showImageMD
          && (
          <div className="col-sm-12 col-md-xl-4">
            <a href={websiteURL} title={itemTitle}>
              {imageURL !== '' ? (
                <Image
                  resizedImageOptions={resizedImageOptions}
                  url={imageURL}
                  // todo: get the proper alt tag for this image
                  // 16:9 aspect for medium
                  alt={itemTitle}
                  smallWidth={ratios.smallWidth}
                  smallHeight={ratios.smallHeight}
                  mediumWidth={ratios.mediumWidth}
                  mediumHeight={ratios.mediumHeight}
                  largeWidth={ratios.largeWidth}
                  largeHeight={ratios.largeHeight}
                  breakpoints={getProperties(arcSite)?.breakpoints}
                  resizerURL={getProperties(arcSite)?.resizerURL}
                />
              ) : (
                <Image
                  smallWidth={ratios.smallWidth}
                  smallHeight={ratios.smallHeight}
                  mediumWidth={ratios.mediumWidth}
                  mediumHeight={ratios.mediumHeight}
                  largeWidth={ratios.largeWidth}
                  largeHeight={ratios.largeHeight}
                  alt={getProperties(arcSite).primaryLogoAlt || 'Placeholder logo'}
                  url={targetFallbackImage}
                  breakpoints={getProperties(arcSite)?.breakpoints}
                  resizedImageOptions={placeholderResizedImageOptions}
                  resizerURL={getProperties(arcSite)?.resizerURL}

                />
              )}
            </a>
          </div>
          )}
        {(customFields.showHeadlineMD || customFields.showDescriptionMD
              || customFields.showBylineMD || customFields.showDateMD)
          && (
          <div className={textClass}>
            {headlineTmpl()}
            {descriptionTmpl()}
            <div className="article-meta">
              {byLineTmpl()}
              {dateTmpl()}
            </div>
          </div>
          )}
      </div>
    </article>
  );
};

export default MediumListItem;
