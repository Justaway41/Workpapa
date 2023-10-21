import { combineReducers } from 'redux';
import location from './locationReducer';
import packages from './packagesReducer';
import profile from './profileReducer';
import app from './appReducer';
import loader from './loaderReducer';

const rootReducer = combineReducers({
    // short hand property names
    location,
    packages,
    profile,
    site: app,
    loader
});

export default rootReducer;
