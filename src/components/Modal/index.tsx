function Modal(props: any) {
  return (
    <div className="modal">
      <div className="modal__content">{props.children}</div>
    </div>
  )
}

export default Modal
