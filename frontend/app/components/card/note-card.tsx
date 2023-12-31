import Notes from "../notes/notes";
import { NoteItem } from "@/app/types/NoteItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Toaster } from "sonner";

import { useNoteContext } from "@/app/context/NoteContext";
import Skeleton from "../skeleton";
import { useState } from "react";

interface NoteCard {
  filteredNotes: NoteItem[];
  titleFilter: string;
  categoryFilter: string;
  showArchived: boolean;
}
const NoteCard = ({ titleFilter, categoryFilter, showArchived, filteredNotes }: NoteCard) => {
  const { isLoading } = useNoteContext();
  const [parent] = useAutoAnimate();

  return (
    <div>
      <div className="flex flex-col " ref={parent}>
        {!filteredNotes.length && (titleFilter || categoryFilter || showArchived) && (
          <span className="animate-fadein pb-2">
            No se encontraron resultados con los filtros aplicados
          </span>
        )}
        {titleFilter && (
          <span className="animate-fadein  pb-2">Filtro por título: {titleFilter}</span>
        )}
        {categoryFilter && (
          <span className="animate-fadein  pb-2">Filtro por categoría: {categoryFilter}</span>
        )}
        {showArchived && <span className="animate-fadein  pb-2">Mostrar archivados</span>}
      </div>
      {/*   <ul className="w-full flex flex-col gap-1" ref={parent}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <li key={note.ID} className="mb-2">
              <Notes notes={note} />
            </li>
          ))
        ) : (
          <div>
            <Skeleton count={filteredNotes.length} circle={true} baseColor="#000000" width="%100" />
          </div>
        )}
      </ul> */}
      <ul className="w-full flex flex-col gap-1" ref={parent}>
        {isLoading ? (
          <div className={`animate-fadeOut ${isLoading ? "" : "animate-fadeIn"}`}>
            <Skeleton />
          </div>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <li key={note.ID} className="mb-2 animate-fadein">
              <Notes notes={note} />
            </li>
          ))
        ) : (
          <span>No notes available</span>
        )}
      </ul>
      <Toaster />
    </div>
  );
};

export default NoteCard;
