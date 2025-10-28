import { useEffect, useMemo, useState } from 'react';
import Player from './components/Player.jsx';
import Timeline from './components/Timeline.jsx';
import SongComments from './components/SongComments.jsx';
import {
  AddGeneralCommentModal,
  AddReplyModal,
  AddSectionCommentModal,
} from './components/CommentModal.jsx';
import { fetchSongData, postTimelineComment } from './lib/api.js';

const SONG_ID = 'demo-song';
const AUDIO_URL = '/audio/demo-track.mp3';
function generateId(prefix = 'id') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function useStoredName() {
  const [name, setName] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }
    return localStorage.getItem('collaboratorName') ?? '';
  });
  useEffect(() => {
    if (!name || typeof window === 'undefined') {
      return;
    }
    localStorage.setItem('collaboratorName', name);
  }, [name]);
  return [name, setName];
}

export default function App() {
  const [name, setName] = useStoredName();
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [seekTime, setSeekTime] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const payload = await fetchSongData(SONG_ID);
        if (isMounted) {
          setData(payload);
        }
      } catch (err) {
        console.warn('Falling back to static demo data', err);
        try {
          const response = await fetch('/data/demo-song.json');
          if (!response.ok) throw new Error('Fallback data missing');
          const fallback = await response.json();
          if (isMounted) {
            setData(fallback);
          }
        } catch (innerError) {
          if (isMounted) {
            setError(innerError.message);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const sections = data?.sections ?? [];
  const generalComments = data?.comments ?? [];

  const banner = useMemo(() => {
    if (!name) {
      return 'Commenting as guest — add your name when posting.';
    }
    return `Commenting as ${name}`;
  }, [name]);

  const closeModal = () => setModal(null);

  const updateData = (updater) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      return { ...next };
    });
  };

  const handleAddSectionComment = (sectionId, commentPayload) => {
    updateData((prev) => {
      const nextSections = prev.sections.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          comments: [
            ...section.comments,
            {
              id: generateId('comment'),
              author: commentPayload.name,
              text: commentPayload.text,
              category: commentPayload.category,
              timestamp: Math.floor(Date.now() / 1000),
              replies: [],
            },
          ],
        };
      });
      return { ...prev, sections: nextSections };
    });

    postTimelineComment(SONG_ID, {
      sectionId,
      author: commentPayload.name,
      text: commentPayload.text,
      category: commentPayload.category,
    }).catch((err) => {
      console.warn('Unable to persist comment (demo mode)', err);
    });

    setName(commentPayload.name);
    closeModal();
  };

  const handleAddSectionReply = (sectionId, commentId, replyPayload) => {
    updateData((prev) => {
      const nextSections = prev.sections.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          comments: section.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: generateId('comment'),
                  author: replyPayload.name,
                  text: replyPayload.text,
                  timestamp: Math.floor(Date.now() / 1000),
                },
              ],
            };
          }),
        };
      });
      return { ...prev, sections: nextSections };
    });

    postTimelineComment(SONG_ID, {
      sectionId,
      parentCommentId: commentId,
      author: replyPayload.name,
      text: replyPayload.text,
    }).catch((err) => {
      console.warn('Unable to persist reply (demo mode)', err);
    });

    setName(replyPayload.name);
    closeModal();
  };

  const handleAddGeneralComment = (commentPayload) => {
    updateData((prev) => ({
      ...prev,
      comments: [
        ...prev.comments,
        {
          id: generateId('comment'),
          author: commentPayload.name,
          text: commentPayload.text,
          timestamp: Math.floor(Date.now() / 1000),
          replies: [],
        },
      ],
    }));

    postTimelineComment(SONG_ID, {
      author: commentPayload.name,
      text: commentPayload.text,
    }).catch((err) => {
      console.warn('Unable to persist general comment (demo mode)', err);
    });

    setName(commentPayload.name);
    closeModal();
  };

  const handleAddGeneralReply = (commentId, replyPayload) => {
    updateData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) => {
        if (comment.id !== commentId) return comment;
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: generateId('comment'),
              author: replyPayload.name,
              text: replyPayload.text,
              timestamp: Math.floor(Date.now() / 1000),
            },
          ],
        };
      }),
    }));

    postTimelineComment(SONG_ID, {
      parentCommentId: commentId,
      author: replyPayload.name,
      text: replyPayload.text,
    }).catch((err) => {
      console.warn('Unable to persist general reply (demo mode)', err);
    });

    setName(replyPayload.name);
    closeModal();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">
        Loading timeline…
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 text-center text-slate-600">
        <div>
          <p className="text-lg font-semibold">Unable to load song data.</p>
          <p className="mt-2 text-sm text-slate-500">{error ?? 'Unknown error'}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Music Timeline Comment System</h1>
          <p className="text-lg text-slate-600">
            Drop feedback, assign singers, and collaborate on each section of the track.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {banner}
          </div>
        </header>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow">
          <Player
            audioUrl={AUDIO_URL}
            sections={sections}
            activeSectionId={activeSectionId}
            onSectionSelect={(sectionId) => setActiveSectionId(sectionId)}
            seekToTime={seekTime}
          />
          <Timeline
            sections={sections}
            onSeek={(time, sectionId) => {
              setSeekTime(time);
              setActiveSectionId(sectionId ?? null);
              setTimeout(() => setSeekTime(null), 200);
            }}
            onAddComment={(sectionId) =>
              setModal({ type: 'section', sectionId })
            }
            onAddReply={(sectionId, commentId) =>
              setModal({ type: 'reply', sectionId, commentId })
            }
          />
        </section>

        <SongComments
          comments={generalComments}
          onAddComment={() => setModal({ type: 'general' })}
          onAddReply={(commentId) => setModal({ type: 'general-reply', commentId })}
        />
      </div>

      {modal?.type === 'section' && (() => {
        const section = sections.find((item) => item.id === modal.sectionId);
        if (!section) return null;
        return (
          <AddSectionCommentModal
            section={section}
            initialName={name}
            onClose={closeModal}
            onSubmit={(payload) => handleAddSectionComment(modal.sectionId, payload)}
          />
        );
      })()}

      {modal?.type === 'reply' && (() => {
        const section = sections.find((item) => item.id === modal.sectionId);
        const comment = section?.comments?.find((item) => item.id === modal.commentId);
        if (!section || !comment) return null;
        return (
          <AddReplyModal
            initialName={name}
            onClose={closeModal}
            onSubmit={(payload) =>
              handleAddSectionReply(modal.sectionId, modal.commentId, payload)
            }
          />
        );
      })()}

      {modal?.type === 'general' && (
        <AddGeneralCommentModal
          initialName={name}
          onClose={closeModal}
          onSubmit={handleAddGeneralComment}
        />
      )}

      {modal?.type === 'general-reply' && (() => {
        const comment = generalComments.find((item) => item.id === modal.commentId);
        if (!comment) return null;
        return (
          <AddReplyModal
            initialName={name}
            onClose={closeModal}
            onSubmit={(payload) => handleAddGeneralReply(modal.commentId, payload)}
          />
        );
      })()}
    </main>
  );
}
