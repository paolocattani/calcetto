import '@testing-library/jest-dom/extend-expect';
import '@testing-library/user-event';

import { enableFetchMocks } from 'jest-fetch-mock';

export default (): void => {
	enableFetchMocks();
};
