import { useMemo, useState } from "react";
import { Identifier } from "../types";

export const useRecordSelection = (): [
    Identifier[],
    {
      select: (ids: Identifier[]) => void;
      unselect: (ids: Identifier[]) => void;
      toggle: (id: Identifier) => void;
      clearSelection: () => void;
    }
  ] => {
  const [ids, setIds] = useState<Identifier[]>([]);

  const selectionModifier = useMemo(() => ({
    select: (idsToAdd: Identifier[]) => {
      if (!idsToAdd) return;
      setIds([...idsToAdd])
    },
    unselect: (idsToRemove: Identifier[]) => {
      if (!idsToRemove || idsToRemove.length === 0) return;
      setIds(ids => {
        if (!Array.isArray(ids)) return [];
        return ids.filter(id => !idsToRemove.includes(id));
      })
    },
    toggle: (id: Identifier) => {
      if (typeof id === 'undefined') return;
      setIds(ids => {
        if (!Array.isArray(ids)) return [...ids];
        const index = ids.indexOf(id);
        return (index > -1)
          ? [...ids.slice(0, index), ...ids.slice(index + 1)]
          : [...ids, id];
      })
    },
    clearSelection: () => {
      setIds([]);
    }
  }), [setIds]);

  return [ids, selectionModifier];
}