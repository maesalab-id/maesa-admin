import { Route, Routes } from 'react-router-dom';
import { List } from '../pages/List';

export const Router = () => {
  return (
    <Routes>
      <Route path="list" element={<List />} />
    </Routes>
  );
};
