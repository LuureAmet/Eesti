import { useEffect, useState } from 'react';

const CATEGORIES = ['Vocal', 'Instrument', 'Mix', 'Idea'];

function ModalShell({ title, children, onClose }) {
  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition hover:text-slate-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function AddSectionCommentModal({ section, initialName, onClose, onSubmit }) {
  const [name, setName] = useState(initialName ?? '');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Vocal');

  return (
    <ModalShell title={`Add Comment to ${section.label}`} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ name, text, category });
        }}
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Your Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Comment</label>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="h-40 w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
            placeholder={section.placeholder}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Post Comment →
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export function AddReplyModal({ initialName, onClose, onSubmit }) {
  const [name, setName] = useState(initialName ?? '');
  const [text, setText] = useState('');

  return (
    <ModalShell title="Add Reply" onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ name, text });
        }}
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Your Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Reply</label>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="h-32 w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
            placeholder="Add your thoughts"
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Post Reply →
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export function AddGeneralCommentModal({ initialName, onClose, onSubmit }) {
  const [name, setName] = useState(initialName ?? '');
  const [text, setText] = useState('');

  return (
    <ModalShell title="Add General Comment" onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ name, text });
        }}
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Your Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Comment</label>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="h-40 w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
            placeholder="Share lyrics, ideas, or notes"
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Post Comment →
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
