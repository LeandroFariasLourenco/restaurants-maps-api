import React from 'react';

import * as S from './styled';

const Skeleton = ({
  width,
  height,
}) => (
  <S.LoadingSkeleton
    height={height}
    width={width}
  />
);

export default Skeleton;
