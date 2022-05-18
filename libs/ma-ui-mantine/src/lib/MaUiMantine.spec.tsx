import { render } from '@testing-library/react';

import MaUiMantine from './MaUiMantine';

describe('MaUiMantine', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MaUiMantine />);
    expect(baseElement).toBeTruthy();
  });
});
