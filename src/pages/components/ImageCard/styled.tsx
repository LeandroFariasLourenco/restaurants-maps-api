import styled from 'styled-components';

export const Card = styled.div`
  min-width: 90px;
  height: 90px;
  border-radius: 8px;
  background-image: ${({ photo }) => `url(${photo})`};
  background-size: cover;
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: white;
  font-size: 15px;
  margin-top: 10px;
`;
