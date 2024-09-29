import React from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';
import Ads from '../../features/Ads/Ads';

const AdSummary = () => {
  const { searchPhrase } = useParams(); 
  const ads = useSelector(getAllAds);

  const filteredAds = ads.filter(ad => 
    ad.title && ad.title.toLowerCase().includes(searchPhrase ? searchPhrase.toLowerCase() : '')
  );
  console.log('searchpharse', searchPhrase);

  return (
    <div>
      <h2 className="text-center my-3">Search results for "{searchPhrase || 'undefined'}"</h2>
      <Row className="justify-content-between">
        {filteredAds.length > 0 ? (
          <Ads ads={filteredAds} /> 
        ) : (
          <p className="text-center">No ads found for "{searchPhrase}".</p>
        )}
      </Row>
    </div>
  );
};

export default AdSummary;