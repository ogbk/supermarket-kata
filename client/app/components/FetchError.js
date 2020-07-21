// @flow

import React from 'react';

type Props = {
  error: string,
}

const FetchError = ({ error }: Props) => (
  <div>
    <h1>{`ERROR-- ${error}`}</h1>
  </div>
);

export default FetchError;
