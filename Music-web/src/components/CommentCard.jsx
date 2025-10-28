import clsx from 'clsx';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function CommentCard({
  section,
  comment,
  onAddReply,
  onSeek,
}) {
  return (
    <div
      className="group relative flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
      style={{ borderTopColor: section.color, borderTopWidth: '6px' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {section.label}
          </div>
          <button
            type="button"
            className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-500"
            onClick={() => onSeek?.(section.startTime, section.id)}
          >
            {formatTime(section.startTime)} – {formatTime(section.endTime)}
          </button>
        </div>
        <div>
          <span
            className={clsx(
              'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
              {
                'bg-blue-100 text-blue-700': comment.category === 'Vocal',
                'bg-emerald-100 text-emerald-700': comment.category === 'Instrument',
                'bg-amber-100 text-amber-700': comment.category === 'Mix',
                'bg-purple-100 text-purple-700': comment.category === 'Idea',
                'bg-slate-200 text-slate-700': !comment.category,
              }
            )}
          >
            {comment.category ?? 'General'}
          </span>
        </div>
      </div>
      <div className="text-lg leading-relaxed text-slate-800">{comment.text}</div>
      <div className="text-sm font-medium text-slate-500">— {comment.author}</div>
      <div className="flex flex-col gap-3">
        {comment.replies?.map((reply) => (
          <div key={reply.id} className="ml-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
            <div className="font-semibold text-slate-600">{reply.author}</div>
            <div className="mt-1 text-slate-700">{reply.text}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onAddReply?.(comment.id)}
          className="text-sm font-semibold text-blue-600 hover:text-blue-500"
        >
          + Reply
        </button>
      </div>
    </div>
  );
}
