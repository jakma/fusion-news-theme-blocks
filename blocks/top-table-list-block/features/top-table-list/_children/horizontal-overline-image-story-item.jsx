import React from 'react';
import { Image } from '@wpmedia/engine-theme-sdk';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import Overline from '@wpmedia/overline-block';
import getProperties from 'fusion:properties';

import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';
import { ratiosPropsFor } from '../shared/helper';

const HorizontalOverlineImageStoryItem = (props) => {
  const {
    websiteURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    overlineDisplay,
    overlineUrl,
    overlineText,
    displayDate,
    id,
    customFields,
    arcSite,
    resizedImageOptions,
    placeholderResizedImageOptions,
    targetFallbackImage,
    imageRatio,
  } = props;
  const showSeparator = by && by.length !== 0 && customFields.showDateLG;
  const textClass = customFields.showImageLG ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';

  const overlineTmpl = () => {
    if (customFields.showOverlineLG && overlineDisplay) {
      return (
        (
          <Overline
            customUrl={overlineUrl}
            customText={overlineText}
            className="overline"
            editable
          />
        )
      );
    }
    return null;
  };

  const headlineTmpl = () => {
    if (customFields.showHeadlineLG && itemTitle) {
      return (
        <a href={websiteURL} title={itemTitle} className="lg-promo-headline">
          <Title primaryFont={primaryFont} className="lg-promo-headline">{itemTitle}</Title>
        </a>
      );
    }
    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescriptionLG && descriptionText) {
      return (
        <DescriptionText secondaryFont={primaryFont} className="description-text">
          {descriptionText}
        </DescriptionText>
      );
    }
    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showBylineLG && !checkObjectEmpty(element)) {
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
    if (customFields.showDateLG && displayDate) {
      return (
        <>
          <ArticleDate date={displayDate} />
        </>
      );
    }
    return null;
  };

  const ratios = ratiosPropsFor('LG', imageRatio);

  return (
    <article key={id} className="container-fluid large-promo">
      <div className="row lg-promo-padding-bottom">
        {customFields.showImageLG
        && (
        <div className="col-sm-12 col-md-xl-6">
          {imageURL !== '' ? (
            <a href={websiteURL} title={itemTitle}>
              <Image
                resizedImageOptions={resizedImageOptions}
                url={imageURL}
                // todo: get the proper alt tag for this image
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
            </a>
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
        </div>
        )}
        {(customFields.showHeadlineLG || customFields.showDescriptionLG
            || customFields.showBylineLG || customFields.showDateLG)
        && (
        <div className={textClass}>
          {overlineTmpl()}
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

export default HorizontalOverlineImageStoryItem;
