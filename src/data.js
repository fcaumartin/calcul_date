import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: 'toto', // default value (aka initial value)
  });


  export {textState}