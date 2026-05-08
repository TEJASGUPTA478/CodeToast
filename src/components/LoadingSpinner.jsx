export default function LoadingSpinner() {
  return (
    <div className="loader">

      <div className="spin-wrap">
        <div className="spin-ring" />
        <div className="spin-ico">🍞</div>
      </div>

      <div className="spin-txt">
        <p>
          Roasting your portfolio...</p>
        <p>This might sting a little.</p>
      </div>
    </div>
  )
}