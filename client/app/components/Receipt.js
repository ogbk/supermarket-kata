// @flow

import React, { useEffect, useState } from 'react';
// import { computeTotal } from '../util/functions';
// import type { CartType } from '../util/datatypes';

type Props = {
}

const Receipt = ({ }: Props) => {

  return (
    <div className="receipt">
      <span className="title">RECEIPT</span>
      <div className="content">
        <textarea readOnly>
          RECEIPT - CONTENT
        </textarea>
      </div>
    </div>
  );
};

export default Receipt;
