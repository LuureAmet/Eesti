export default function SongComments({ comments, onAddComment, onAddReply }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">General Comments & Lyrics</h2>
        <button
          type="button"
          onClick={onAddComment}
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500"
        >
          + Add General Comment
        </button>
      </div>
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            Share broad ideas, lyrics, or production notes here.
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold text-slate-700">{comment.author}</div>
                <div className="text-xs uppercase tracking-wide text-slate-400">
                  {new Date(comment.timestamp * 1000).toLocaleString()}
                </div>
              </div>
              <div className="whitespace-pre-wrap text-slate-800">{comment.text}</div>
              <div className="space-y-3">
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
          ))
        )}
      </div>
    </section>
  );
}
