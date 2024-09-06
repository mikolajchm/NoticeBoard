import React from 'react';
import { useDispatch } from 'react-redux';
import { addAd } from '../../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import AdForm from '../AdForm/AdForm';

const AddAdForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = ad => {
      dispatch(addAd(ad));
      navigate('/')
    };
    return (
      <AdForm action={handleSubmit} actionText="Add ad" />
    )
};

export default AddAdForm;