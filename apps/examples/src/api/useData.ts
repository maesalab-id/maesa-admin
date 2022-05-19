import { Identifier } from '@maesa-admin/core';
import { faker } from '@faker-js/faker';
import { useCallback, useEffect, useReducer } from 'react';

const generateId = (): Identifier => {
  const rand = Math.random().toString(36);
  return `${rand.substr(2, 4)}_${rand.substr(4, 4)}`;
};

const dataReducer = (
  previousState: {
    [id: Identifier]: DataType;
  },
  action: ActionType
) => {
  switch (action.type) {
    case 'CREATE':
      const id = generateId();
      previousState[id] = {
        ...action.payload,
        id,
      };
      return previousState;
    case 'PATCH':
      previousState[action.payload.id] = {
        ...previousState[action.payload.id],
        ...action.payload,
      };
      return previousState;
    case 'UPDATE':
      previousState[action.payload.id] = {
        ...action.payload,
      };
      return previousState;
    case 'REMOVE':
      delete previousState[action.payload];
      return previousState;
    default:
      return previousState;
  }
};

export const useData = (): UseDataResults => {
  const [items, dispatch] = useReducer(dataReducer, {});
  const handleCreate = useCallback<Modifier['create']>(
    (payload) => {
      dispatch({
        type: 'CREATE',
        payload,
      });
    },
    [dispatch]
  );
  const handlePatch = useCallback<Modifier['patch']>(
    (id, payload) => {
      dispatch({
        type: 'PATCH',
        payload: {
          ...payload,
          id,
        },
      });
    },
    [dispatch]
  );
  const handleUpdate = useCallback<Modifier['update']>(
    (id, payload) => {
      dispatch({
        type: 'UPDATE',
        payload: {
          ...payload,
          id,
        },
      });
    },
    [dispatch]
  );
  const handleRemove = useCallback<Modifier['remove']>(
    (id) => {
      dispatch({
        type: 'REMOVE',
        payload: id,
      });
    },
    [dispatch]
  );
  useEffect(() => {
    const data = new Array(100).fill(0).map(() => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
    }));
    for (let d of data) {
      handleCreate(d);
    }
  }, [handleCreate]);

  return [
    items,
    {
      create: handleCreate,
      patch: handlePatch,
      update: handleUpdate,
      remove: handleRemove,
    },
  ];
};

export type UseDataResults = [
  {
    [id: Identifier]: DataType;
  },
  Modifier
];

type DataType = {
  id: Identifier;
  [key: string]: any;
};

type ActionType =
  | {
      type: 'CREATE';
      payload: {
        [key: string]: any;
      };
    }
  | {
      type: 'PATCH';
      payload: {
        id: DataType['id'];
        [key: string]: any;
      };
    }
  | {
      type: 'UPDATE';
      payload: {
        id: DataType['id'];
        [key: string]: any;
      };
    }
  | {
      type: 'REMOVE';
      payload: DataType['id'];
    };

interface Modifier {
  create: (data: Omit<DataType, 'id'>) => void;
  patch: (id: Identifier, data: DataType) => void;
  update: (id: Identifier, data: DataType) => void;
  remove: (id: Identifier) => void;
}
