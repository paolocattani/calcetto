import { createSelectorHook } from 'react-redux';
import { RootState } from '../../@common/models';

export type FormEventType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const useSelector = createSelectorHook<RootState>();
