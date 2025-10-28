import CommentCard from './CommentCard.jsx';

export default function Timeline({ sections, onAddComment, onAddReply, onSeek }) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-700">{section.label}</h3>
            <button
              type="button"
              className="rounded-full border border-dashed border-slate-400 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
              onClick={() => onAddComment?.(section.id)}
            >
              + Add Comment
            </button>
          </div>
          <p className="text-sm text-slate-500">{section.placeholder}</p>
          <div className="grid gap-4 lg:grid-cols-2">
            {(section.comments ?? []).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                Be the first to leave a note for this section.
              </div>
            ) : (
              (section.comments ?? []).map((comment) => (
                <CommentCard
                  key={comment.id}
                  section={section}
                  comment={comment}
                  onSeek={onSeek}
                  onAddReply={(commentId) => onAddReply?.(section.id, commentId)}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
