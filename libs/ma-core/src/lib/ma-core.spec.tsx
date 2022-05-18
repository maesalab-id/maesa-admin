import { render } from '@testing-library/react';

import MaCore from './ma-core';

describe('MaCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MaCore />);
    expect(baseElement).toBeTruthy();
  });
});
