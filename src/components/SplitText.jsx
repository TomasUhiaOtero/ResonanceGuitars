export default function SplitText({ text, className = '' }) {
  const lines = text.split('\n')

  return (
    <span className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden align-bottom">
              <span data-word className="inline-block will-change-transform">
                {word}
                {wi < line.split(' ').length - 1 ? ' ' : ''}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
