import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Collapse } from 'react-bootstrap'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="mb-4 mt-4">
      {!visible && (
        <Button
          variant="primary"
          onClick={toggleVisibility}
          className="mb-3"
        >
          <i className="bi bi-plus-circle me-2"></i>
          {buttonLabel}
        </Button>
      )}

      <Collapse in={visible}>
        <div>
          {children}
          <Button
            variant="outline-secondary"
            onClick={toggleVisibility}
            className="mt-2"
          >
            <i className="bi bi-x-circle me-2"></i>
            Cancel
          </Button>
        </div>
      </Collapse>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable