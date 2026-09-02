import { Fragment } from 'react'

export default function SplitText({ text, className = '' }) {
  const lines = text.split('\n')

  return (
    <span className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => (
            <Fragment key={wi}>
              {wi > 0 ? ' ' : null}
              <span className="inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]">
                <span data-word className="inline-block will-change-transform">
                  {word}
                </span>
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </span>
  )
}
