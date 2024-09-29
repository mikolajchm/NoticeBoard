import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';
import Ads from '../../features/Ads/Ads';

const AdSummary = () => {
  const { searchPhrase } = useParams(); 
  const ads = useSelector(getAllAds);
  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  return (
    <div>
      {ads.length === 0 ? ( 
        <Spinner animation="border" role="status" className="mx-auto" />
      ) : (
        <div>
          <h2 className="text-center my-3">Search results for "{searchPhrase}"</h2>
          <Row className="justify-content-between">
            {filteredAds.length > 0 ? (
              <Ads ads={filteredAds} /> 
            ) : (
              <p className="text-center">No ads found for "{searchPhrase}".</p>
            )}
          </Row>
        </div>
      )}
    </div>
  );
};

export default AdSummary;