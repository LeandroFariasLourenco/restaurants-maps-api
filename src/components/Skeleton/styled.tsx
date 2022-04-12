import styled, { keyframes } from 'styled-components';

const KeyframeLoading = keyframes`
  from {
    opacity: 0.5;
  }

  to {
  opacity: 1;
  }
`;

export const LoadingSkeleton = styled.div`
  background-color: gray;
  border-radius: 6px;
  margin-bottom: 10px;
  min-width: ${({ width }) => width};
  height: ${({ height }) => height};
  animation: ${KeyframeLoading} 500ms infinite alternate;
`;
