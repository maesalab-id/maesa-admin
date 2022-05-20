import { Route, Routes } from 'react-router-dom';
import { Empty } from '../pages/Empty';
import { List } from '../pages/List';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Empty />} />
      <Route path="list" element={<List />} />
    </Routes>
  );
};
