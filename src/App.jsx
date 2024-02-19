import { useEffect, useState } from "react";
import {
  HiClipboardDocumentList,
  HiArchiveBoxXMark,
  HiMagnifyingGlass,
  HiPaintBrush,
  HiPencilSquare,
} from "react-icons/hi2";
import { HiX } from "react-icons/hi";

import "./App.css";
import ConfirmationModal from "./ConfirmationModal";

function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isopen, setIsopen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState();
  const [backgroundOptions] = useState([
    "#77172E",
    "#692B17",
    "#7C4A03",
    "#264D3B",
    "#0C625D",
    "#256377",
    "#284255",
    "#6C394F",
    "#4B443A",
  ]);

  const setBackground = () => {
    setIsopen(true);
  };

  const closeBackgroundcolor = () => {
    setIsopen(false);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSaveNote = () => {
    if (title.trim() !== "" && message.trim() !== "") {
      const newNote = {
        id: new Date().getTime(),
        title: title,
        message: message,
        backgroundColor: backgroundColor,
      };
      setNotes([...notes, newNote]);
      setTitle("");
      setMessage("");
    }
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setMessage(noteToEdit.message);
      setBackgroundColor(noteToEdit.backgroundColor);
      handleDeleteNote(id);
    }
  };
  return (
    <>
      <div className="bg-black min-h-screen text-gray-200 relative">
        <div className="fixed top-0 w-full flex  bg-gray-900 justify-center items-center py-5 gap-3">
          <HiClipboardDocumentList className="flex h-10 w-10"></HiClipboardDocumentList>
          <h1 className="text-4xl font-sans"> Keep Notes</h1>
        </div>
        <div className="flex justify-center mt-20">
          <div className="pt-2 inline-block relative  mx-auto text-gray-200">
            <input
              className="border bg-neutral-900  h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              name="search"
              placeholder="Search notes title"
            />
            <button type="button" className="absolute right-0 top-0 mt-4 mr-4">
              <HiMagnifyingGlass className="flex h-6 w-6 text-gray-300"></HiMagnifyingGlass>
            </button>
          </div>
        </div>

        <div className="px-3">
          <div
            className="flex flex-col gap-3 max-w-md m-auto mt-6 py-5 px-4 bg-neutral-900 border  rounded-md"
            style={{ backgroundColor: backgroundColor }}
          >
            <h1 className="text-2xl font-bold mb-4 text-center text-slate-300">
              Write Your Note
            </h1>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-2 border outline-none text-white rounded bg-transparent"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Enter note message"
                value={message}
                onChange={handleMessageChange}
                className="w-full p-2 border text-white outline-none rounded bg-transparent"
                rows="4"
              ></textarea>
            </div>
            <div className="flex gap-5 justify-center items-center ">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setMessage("");
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleSaveNote}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded "
              >
                Save Note
              </button>
              <button
                onClick={setBackground}
                className="rounded-full px-2 py-2 hover:bg-neutral-700"
              >
                <HiPaintBrush className="flex h-6 w-6"></HiPaintBrush>
              </button>
            </div>
            {isopen && (
              <>
                <div className="flex gap-3 flex-wrap bg-neutral-800 rounded-md px-2 py-4 relative">
                  <button
                    onClick={closeBackgroundcolor}
                    className="px-1 py-1 rounded-full  absolute right-0 top-0"
                  >
                    <HiX className="h-4 w-4 flex"></HiX>
                  </button>
                  {backgroundOptions.map((color, index) => {
                    return (
                      <button
                        key={"colour" + index}
                        onClick={() => handleBackgroundColorChange(color)}
                        style={{ backgroundColor: color }}
                        className="px-4 py-4  rounded-full "
                      ></button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-16 px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              style={{ backgroundColor: note.backgroundColor }}
              className="border flex flex-col gap-5 rounded px-5 py-4   text-slate-200"
            >
              <div>
                <h2 className="font-semibold text-xl">{note.title}</h2>
                <p>{note.message}</p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => handleEditNote(note.id)}>
                  <HiPencilSquare className=" flex h-6 w-6  text-white"></HiPencilSquare>
                </button>
                <ConfirmationModal
                  modalText="Are you sure, you want to delete this note permanently?"
                  onProceed={() => handleDeleteNote(note.id)}
                >
                  <button
                    type="button"
                    className=" text-white py-1 bg-red-500 hover:bg-red-700 px-2 rounded flex gap-2 items-center  "
                  >
                    Delete
                    <HiArchiveBoxXMark className="flex h-5 w-5"></HiArchiveBoxXMark>
                  </button>
                </ConfirmationModal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
