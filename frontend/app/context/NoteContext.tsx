"use client";
import React, { createContext, useState, useContext, FC, ReactNode, useEffect } from "react";
import { NoteItem } from "../types/NoteItem";
import { toast } from "sonner";

interface NoteProviderProps {
  notes: NoteItem[];
  archiveNote: (noteId: string, archived: boolean) => Promise<void>;
  updateNote: (noteId: string, body: any) => Promise<void>;
  fetchNotes: () => Promise<void>;
  createNote: (newNote: NoteItem) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  isLoading: boolean;
}

const NoteContext = createContext<NoteProviderProps | undefined>(undefined);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://ensolvers-challenge-server.onrender.com";
  const createNote = async (newNote: NoteItem) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }
      setNotes([...notes, newNote]);
      toast.success("Note created successfully");
    } catch (error) {
      toast.error("Error creating note");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      toast("Notes loadded successfully");
      setNotes(result.notes);
    } catch (error) {
      toast("Error fetching notes");
    } finally {
      setIsLoading(false);
    }
  };

  const updateNote = async (noteId: string, body: any) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/notes/${noteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to updating note");
      }
      toast.success("Note updated successfully");
    } catch (error) {
      toast.error("Error updating note");
    } finally {
      setIsLoading(false);
    }
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.ID === noteId ? { ...note, ...body } : note))
    );
  };

  const archiveNote = async (noteId: string, archived: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/notes/${noteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ archived }),
      });

      if (!response.ok) {
        throw new Error("Failed to archive note");
      }
      if (archived) {
        toast.success("Note succesfully unarchived");
      }
      toast.success("Note succesfully archived");
    } catch (error) {
      toast.error("Error archiving note");
    } finally {
      setIsLoading(false);
    }
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.ID === noteId ? { ...note, archived } : note))
    );
  };

  const deleteNote = async (noteId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/notes/${noteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      toast.success("Note succesfully deleted");
    } catch (error) {
      toast.error("Error deleting note");
    } finally {
      setIsLoading(false);
    }
    setNotes((prevNotes) => prevNotes.filter((note) => note.ID !== noteId));
  };

  const contextValue: NoteProviderProps = {
    notes,
    archiveNote,
    updateNote,
    fetchNotes,
    createNote,
    deleteNote,
    isLoading,
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>;
};

export const useNoteContext = (): NoteProviderProps => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext debe ser usado dentro de NoteProvider");
  }
  return context;
};
