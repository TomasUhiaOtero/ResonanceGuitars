import site from '../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <p className="text-xl font-semibold tracking-tight">{site.brand}</p>

          {site.footer.columns.map((column) => (
            <nav key={column.title}>
              <h3 className="text-xs uppercase tracking-[0.25em] text-mute">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-mute transition-colors hover:text-bone focus-visible:text-bone focus-visible:outline-2 focus-visible:outline-amber"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-16 text-xs text-mute">{site.footer.legal}</p>
      </div>
    </footer>
  )
}
