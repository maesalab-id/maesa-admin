import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface MaUiMantineProps {}

const StyledMaUiMantine = styled.div`
  color: pink;
`;

export function MaUiMantine(props: MaUiMantineProps) {
  return (
    <StyledMaUiMantine>
      <h1>Welcome to MaUiMantine!</h1>
    </StyledMaUiMantine>
  );
}

export default MaUiMantine;
