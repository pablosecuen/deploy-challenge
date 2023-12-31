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
      <div className="pl-2 flex flex-col w-full" ref={parent}>
        {!filteredNotes.length && (titleFilter || categoryFilter || showArchived) && (
          <span className="animate-fadein pb-2">No results found with the applied filters</span>
        )}
        {titleFilter && <span className="animate-fadein pb-2">Filter by title: {titleFilter}</span>}
        {categoryFilter && (
          <span className="animate-fadein pb-2">Filter by category: {categoryFilter}</span>
        )}
        {showArchived && <span className="animate-fadein pb-2">Show archived</span>}
      </div>

      <ul className="w-full flex flex-col gap-1" ref={parent}>
        {isLoading ? (
          <div className={`animate-fadeOut ${isLoading ? "" : "animate-fadeIn"}`}>
            <Skeleton />
          </div>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <li key={note.ID} className="mb-2 animate-fadein w-full">
              <Notes notes={note} />
            </li>
          ))
        ) : (
          <span className="animate-fadein pb-2 pl-2">No notes available</span>
        )}
      </ul>
      <Toaster />
    </div>
  );
};

export default NoteCard;
