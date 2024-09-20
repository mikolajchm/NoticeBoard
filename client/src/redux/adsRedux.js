//selectors 
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);

//actions 
const createActionName = (actionName) => `app/ad/${actionName}`;
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

//action creators
export const addAd = payload => ({ type: ADD_AD, payload});
export const editAd = payload => ({ type: EDIT_AD, payload });
export const removeAd = payload => ({ type: REMOVE_AD, payload});

const adsReducer = (statePart = [], action) => {
    switch(action.type) {
        case ADD_AD:
            return [...statePart, {...action.payload }];
        case EDIT_AD:
            return 
        case REMOVE_AD:
            return statePart.filter((ad) => ad.id !== action.payload);
    default: 
        return  statePart;
    };
};

export default adsReducer;