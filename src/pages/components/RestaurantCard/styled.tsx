import styled from 'styled-components';

export const Restaurant = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 5px;
  padding: 16px;
  background-color: white;
  border-left: 5px solid transparent;
  transition: border-left-color 200ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    border-left-color: ${(props) => props.theme.colors.primary};
  }
`;

export const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  line-height: 20px;
  margin-bottom: 10px;
`;

export const Address = styled.span`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 19px;
  margin: 10px 0;
`;

export const RestaurantImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 6px;
  object-fit: cover;
  display: ${({ imageLoaded }) => (imageLoaded ? 'block' : 'none')};
`;
