import { useState } from 'react';
import { useRouter } from 'next/router';

import { MyHeader } from './header';

export function MyLayout({ content }) {
  const [showMap, setShowMap] = useState(false);

  const { asPath } = useRouter();
  const showHomeIcon = asPath.match(/^\/$/) ? false : true;
  const showMapIcon = asPath.match(/neighborhoods\/[a-z]+/) ? true : false;

  return (
    <>
      <MyHeader />
      {content}
    </>
  );
}
