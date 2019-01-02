import * as utils from 'utils';

export const getCurrentUser = () => utils.request.get('/whoami');
