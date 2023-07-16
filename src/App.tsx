import './App.css'

function App() {
  return (
    <>
      <h1>To do</h1>
      <div className="card">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Change font to jetbrains</span>
            <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Integrate supabase</span>
            <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Add login</span>
            <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Read / Write to-do's to supabase</span>
            <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Create lemonsqueezy shop</span>
            <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Integrate lemonsqueezy license key paywall</span>
            <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
          </label>
        </div>
      </div>
    </>
  )
}

export default App
