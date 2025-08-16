import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `EA Sports | ${title}`;
  }, [title]);
};

export default useTitle;
