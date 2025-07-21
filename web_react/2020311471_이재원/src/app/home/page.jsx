"use client"
import { useState, useEffect } from "react";
import { fetchNotes, fetchProfile, addNote, updateNote, deleteNote, pin, unpin, updateUserPreferences, fetchComments, addComment, deleteComment } from "@/actions";
import { signOut } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NotesPage({ user }) {
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [userProfile, setUserProfile] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [theme, setTheme] = useState("");
    const [font, setFont] = useState("");
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const loadNotes = async () => {
            const fetchedNotes = await fetchNotes();
            setNotes(fetchedNotes);
            if (fetchedNotes.length > 0) {
                setCurrentNoteId(fetchedNotes[0].id);
            }
        };
        const loadProfile = async () => {
            const fetchedProfile = await fetchProfile();
            setUserProfile(fetchedProfile.profile);
            setTheme(fetchedProfile.theme);
            setFont(fetchedProfile.font);
            document.documentElement.setAttribute("data-theme", fetchedProfile.theme);
        }
        loadNotes();
        loadProfile();
    }, []);

    useEffect(() => {
        const loadComments = async () => {
            if (currentNoteId) {
                const fetchedComments = await fetchComments(currentNoteId);
                setComments(fetchedComments);
                if (fetchedComments.length > 0) {
                    setShowComments(true);
                }
                else {
                    setShowComments(false);
                }
            }
        };
        loadComments();
    }, [currentNoteId]);

    const addNewNote = async () => {
        const newNote = await addNote();
        const newNoteId = notes.length + 1;
        const updatedNote = {
            ...newNote,
            title: `Untitled ${newNoteId}`,
        };
        setNotes([...notes, updatedNote]);
        setCurrentNoteId(newNote.id);
    };

    const handleTitleChange = async (e) => {
        const newTitle = e.target.value;
        const updatedNote = await updateNote(currentNoteId, { title: newTitle });
        setNotes(
            notes.map((note) =>
                note.id === currentNoteId ? { ...note, title: updatedNote.title } : note
            )
        );
    };

    const handleContentChange = async (e) => {
        const newContent = e.target.value;
        const updatedNote = await updateNote(currentNoteId, { content: newContent });
        setNotes(
            notes.map((note) =>
                note.id === currentNoteId ? { ...note, content: updatedNote.content } : note
            )
        );
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNote(noteId);
            setNotes(notes.filter((note) => note.id !== noteId));
        } catch (err) {
            console.error("Error deleting note:", err);
            alert("Failed to delete the note. Please try again.");
        }
    };

    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredNotes([]);
            return;
        }

        const results = notes.filter((note) =>
            note.content.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredNotes(results);
    };

    const handleSwitchToUpload = () => {
        setIsUploading(true);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("Upload failed");

            const { profile } = await response.json();
            setUserProfile(profile);
            setIsUploading(false);
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    const handlePinChange = async (noteId) => {
        const updatedNote = await pin(noteId);
        setNotes(
            notes.map((note) =>
                note.id === noteId ? { ...note, pinned: updatedNote.pinned } : note
            )
        );
    };

    const handleUnpinChange = async (noteId) => {
        const updatedNote = await unpin(noteId);
        setNotes(
            notes.map((note) =>
                note.id === noteId ? { ...note, pinned: updatedNote.pinned } : note
            )
        );
    };

    const handleSave = async () => {
        setTheme(theme);
        setFont(font);
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.setProperty("--font-family", font);
        await updateUserPreferences({ theme, font });
        setShowSettings(false);
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        const addedComment = await addComment(currentNoteId, newComment.trim());
        setComments([...comments, addedComment]);
        setNewComment("");
    };

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId);
        setComments(comments.filter((comment) => comment.id !== commentId));
    };

    const currentNote = notes.find((note) => note.id === currentNoteId);

    return (
        <div className={`flex font-${font}`}>
            <div className="bg-sidebarBg w-60 min-h-screen p-1">
                <button className="items-center py-1 px-3 h-8 text-sm font-semibold rounded-md text-sidebarNormalFont bg-gray-200 hover:bg-gray-300"
                    onClick={() => signOut({ callbackUrl: "/login" })}>
                    Log Out
                </button>
                <div className="flex text justify-between text-sm py-1 px-3 font-medium h-8 my-1">
                    <div className="flex items-center gap-2">
                        <img alt="Profile Pic" loading="lazy" width="400" height="400" decoding="async" data-nimg="1" className="h-full w-auto object-contain rounded-md" src={userProfile || "/default_profile.jpg"} />
                        <div className="cursor-pointer hover:bg-gray-200" onClick={handleSwitchToUpload}>
                            {user.name}
                        </div>
                    </div>
                    <svg role="graphics-symbol" viewBox="0 0 24 24" className="h-full cursor-pointer hover:bg-gray-200" onClick={handleSwitchToUpload}>
                        <g>
                            <path d="M9.944 14.721c.104.094.216.12.336.079l1.703-.688 6.844-6.844-1.406-1.398-6.836 6.836-.711 1.68c-.052.13-.029.242.07.335zm8.102-9.484l1.414 1.406.515-.523a.917.917 0 00.282-.633.76.76 0 00-.258-.61l-.25-.25a.702.702 0 00-.578-.187.975.975 0 00-.617.297l-.508.5zm-9.453.127a3.85 3.85 0 00-3.85 3.85v6.5a3.85 3.85 0 003.85 3.85h6.5a3.85 3.85 0 003.85-3.85V12.95a.85.85 0 10-1.7 0v2.764a2.15 2.15 0 01-2.15 2.15h-6.5a2.15 2.15 0 01-2.15-2.15v-6.5a2.15 2.15 0 012.15-2.15h3.395a.85.85 0 000-1.7H8.593z"></path>
                        </g>
                    </svg>
                </div>
                <div>
                    <div className="flex w-full items-center py-1 px-3 h-8 text-sm font-semibold rounded-md text-sidebarNormalFont fill-current">
                        <div className="mr-2 h-5/6">
                            <svg role="graphics-symbol" viewBox="0 0 20 20" className="h-full">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 8.75C4 6.12665 6.12665 4 8.75 4C11.3734 4 13.5 6.12665 13.5 8.75C13.5 11.3734 11.3734 13.5 8.75 13.5C6.12665 13.5 4 11.3734 4 8.75ZM8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15C10.2056 15 11.545 14.5024 12.6073 13.668L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L13.668 12.6073C14.5024 11.545 15 10.2056 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5Z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            className="w-full p-2 text-sm border rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="flex w-full items-center py-1 px-3 h-8 text-sm font-semibold rounded-md text-sidebarNormalFont fill-current">
                        <div className="mr-2 h-5/6">
                            <svg role="graphics-symbol" viewBox="0 0 20 20" className="h-full">
                                <path d="M10.1416 3.77299C10.0563 3.71434 9.94368 3.71434 9.85837 3.77299L3.60837 8.06989C3.54053 8.11653 3.5 8.19357 3.5 8.2759V14.2499C3.5 14.9402 4.05964 15.4999 4.75 15.4999H7.5L7.5 10.7499C7.5 10.0595 8.05964 9.49987 8.75 9.49987H11.25C11.9404 9.49987 12.5 10.0595 12.5 10.7499L12.5 15.4999H15.25C15.9404 15.4999 16.5 14.9402 16.5 14.2499V8.2759C16.5 8.19357 16.4595 8.11653 16.3916 8.06989L10.1416 3.77299ZM9.00857 2.53693C9.60576 2.12636 10.3942 2.12636 10.9914 2.53693L17.2414 6.83383C17.7163 7.1603 18 7.69963 18 8.2759V14.2499C18 15.7687 16.7688 16.9999 15.25 16.9999H12.25C11.5596 16.9999 11 16.4402 11 15.7499L11 10.9999H9L9 15.7499C9 16.4402 8.44036 16.9999 7.75 16.9999H4.75C3.23122 16.9999 2 15.7687 2 14.2499V8.2759C2 7.69963 2.2837 7.1603 2.75857 6.83383L9.00857 2.53693Z"></path>
                            </svg>
                        </div>Home
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex items-center h-8 px-1 text-sidebarTitleFont text-xs font-semibold">
                        <p>Private</p>
                    </div>
                    {notes.map(note => (
                        <div
                            key={note.id}
                            className={`flex w-full items-center py-1 px-3 h-8 text-sm font-semibold rounded-md text-sidebarNormalFont fill-current ${note.id === currentNoteId ? 'bg-sidebarRowClicked text-sidebarClickedFont' : ''} cursor-pointer hover:bg-gray-200`}
                            onClick={() => setCurrentNoteId(note.id)}
                        >
                            {note.pinned ? (
                                <button
                                    onClick={() => handleUnpinChange(note.id)}
                                    className="hover:text-gray-400 mr-2"
                                >
                                    &#9733;
                                </button>
                            ) : (
                                <button
                                    onClick={() => handlePinChange(note.id)}
                                    className="text-gray-200 hover:text-gray-400 mr-2 unpinned"
                                >
                                    &#9734;
                                </button>
                            )}
                            <div className="mr-2 h-3/4">
                                <svg role="graphics-symbol" viewBox="0 0 16 16" className="h-full">
                                    <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path>
                                </svg>
                            </div>
                            {note.title}
                            <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                &#10005;
                            </button>
                        </div>
                    ))}
                    <div
                        className="flex w-full items-center py-1 px-3 h-8 text-sm font-semibold rounded-md text-sidebarNormalFont fill-current cursor-pointer hover:bg-gray-200"
                        onClick={addNewNote}
                    >
                        <button className="text-gray-200 mr-2 unpinned">
                            &#9734;
                        </button>
                        <div className="mr-2 h-3/4">
                            <svg role="graphics-symbol" viewBox="0 0 16 16" className="h-full">
                                <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path>
                            </svg>
                        </div>
                        New Page
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-grow">
                {isUploading ? (
                    <div className="w-7/12 max-w-screen-lg py-32">
                        <h2>Change Profile Picture</h2>
                        <form onSubmit={handleUpload}>
                            <input name="data" type="file" accept="image/*" required />
                            <input name="userId" type="hidden" value={user.id} />
                            <button
                                className="border-2 border-black rounded-md font-bold p-1">
                                Change
                            </button>
                        </form>
                        <button
                            className="border-2 border-black rounded-md font-bold p-1 mt-3"
                            onClick={() => setIsUploading(false)
                            }>
                            Go back
                        </button>
                    </div>
                ) : (
                    <div className="w-7/12 max-w-screen-lg py-32">
                        {filteredNotes.length > 0 && (
                            <div className="bg-sidebarRowClicked p-2 border mt-2 rounded-md shadow-md">
                                <p className="font-semibold text-gray-600 mb-2">Search Results:</p>
                                {filteredNotes.map((note) => (
                                    <div
                                        key={note.id}
                                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setFilteredNotes([]);
                                            setCurrentNoteId(note.id);
                                        }}
                                    >
                                        <p className="font-medium">{note.title}</p>
                                        <p className="text-sm text-gray-500 truncate">{note.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {currentNote ? (
                            <>
                                <div className="py-8">
                                    <button
                                        onClick={toggleEditMode}
                                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                                    >
                                        {isEditing ? "View" : "Edit"}
                                    </button>
                                    {isEditing ? (
                                        <textarea
                                            className="head"
                                            value={currentNote?.title || ""}
                                            onChange={handleTitleChange}
                                            placeholder="Note Title"
                                        />
                                    ) : (
                                        <h1 className="head">{currentNote?.title}</h1>
                                    )}
                                </div>
                                <div>
                                    {isEditing ? (
                                        <textarea
                                            className="write border-gray-300 focus:border-blue-500 p-2"
                                            value={currentNote?.content || ""}
                                            onChange={handleContentChange}
                                            placeholder="Write your note here..."
                                        />
                                    ) : (
                                        <div className="markdown-body py-4 px-4">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {(currentNote?.content).replace(/<br\s*\/?>/gi, '\n\n').replace(/<\/?p>/gi, '\n\n') || ""}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-500 text-lg">
                                Start writing your note by clicking "New Page"!
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="settings-container">
                <button
                    className="settings-button"
                    onClick={() => setShowSettings(!showSettings)}
                    aria-label="Toggle Settings"
                >
                    Settings
                </button>
                {showSettings && (
                    <div className="settings-modal">
                        <h1>Settings</h1>
                        <div className="settings-row">
                            <label>Theme</label>
                            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                        <div className="settings-row">
                            <label>Font</label>
                            <select value={font} onChange={(e) => setFont(e.target.value)}>
                                <option value="default">Sans Serif</option>
                                <option value="serif">Serif</option>
                                <option value="monospace">Monospace</option>
                            </select>
                        </div>
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                )}
                {currentNote ? (
                    <div className="py-2">
                        <button className="submit-button" onClick={() => setShowComments(!showComments)}>
                            {showComments ? "Comments" : "Comments"}
                        </button>
                        {showComments && (
                            <div className="comments-section">
                                <div className="comments-header">Comments</div>
                                <button onClick={() => setShowComments(!showComments)} className="submit-button my-2">
                                    Hide comments
                                </button>
                                <div className="comment-list">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="comment-item">
                                            <p className="comment-text">{comment.content}</p>
                                            <small className="comment-time">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </small>
                                            <button className="hover:bg-slate-600" onClick={() => handleDeleteComment(comment.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="comment-input-section">
                                    <textarea
                                        placeholder="Write your comment on current note..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="comment-input"
                                    />
                                    <button onClick={handleAddComment} className="submit-button">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (<></>)}
            </div>
        </div>
    );
}
