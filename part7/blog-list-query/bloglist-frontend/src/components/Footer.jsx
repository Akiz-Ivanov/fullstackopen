const Footer = () => {
  return (
    <footer className="border-top mt-auto py-4 footer">
      <div className="container text-center">
        <p className="mb-1 fw-semibold">
          <i className="bi bi-journal-text me-2"></i>
          BlogList App • FullStackOpen Part 7
        </p>

        <p className="mb-0 text-muted small">
          © {new Date().getFullYear()} Built with React + React Query + Bootstrap
        </p>
      </div>
    </footer>
  )
}

export default Footer