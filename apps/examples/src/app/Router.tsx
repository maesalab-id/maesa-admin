import { Route, Routes } from 'react-router-dom';
import { Empty } from '../pages/Empty';
import { List } from '../pages/List';
import { ListCustomForm } from '../pages/ListCustomForm';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Empty />} />
      <Route path="list" element={<List />} />
      <Route path="list-custom-form" element={<ListCustomForm />} />
    </Routes>
  );
};
