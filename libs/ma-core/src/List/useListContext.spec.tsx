import { render } from '@testing-library/react';

import { ListContext } from './ListContext';
import { useListContext } from './useListContext';

describe('useListContext', () => {
  const NaiveList = (props: any) => {
    const { data } = useListContext(props);
    return (
      <ul>
        {data.map((record) => (
          <li key={record.id}>{record.title}</li>
        ))}
      </ul>
    );
  };

  it('should return the listController props form the ListContext', () => {
    const { getByText } = render(
      <ListContext.Provider
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={{
          data: [{ id: 1, title: 'hello' }],
        }}
      >
        <NaiveList />
      </ListContext.Provider>
    );
    expect(getByText('hello')).not.toBeNull();
  });

  it('should return injected props if the context was not set', () => {
    jest.spyOn(console, 'log').mockImplementationOnce(() => {
      /* no-op */
    });
    const { getByText } = render(
      <NaiveList resource="foo" data={[{ id: 1, title: 'hello' }]} />
    );
    expect(getByText('hello')).not.toBeNull();
  });
});
