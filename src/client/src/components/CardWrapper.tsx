import React, { useEffect } from 'react';
import { useState } from 'react';
import { render } from 'react-dom';
import CardsList from './CardList.tsx';
import ExpandedCard from './ExpandedCard.tsx';

let currOrg = {
  name: '',
  yearFounded: '',
  location: '',
  tags: [],
  shortDisc: '',
  longDisc: '',
  facebook: '',
  website: '',
};

const CardWrapper = (props) => {
  const { data } = props;
  const { searchQuery } = props;
  const { filter } = props;
  const [state, setState] = useState('list');
  const switchToExpanded = (org) => {
    currOrg = org;
    setState('expanded');
  };

  const switchToList = () => {
    setState('list');
  };
  return (
    <div style={{ height: '80vh' }}>
      {state === 'list' && (
        <CardsList
          data={data}
          searchQuery={searchQuery}
          filter={filter}
          switch={(o) => switchToExpanded(o)}
        />
      )}

      {state === 'expanded' && (
        <ExpandedCard org={currOrg} switchToList={() => switchToList} />
      )}
    </div>
  );
};
export default CardWrapper;
