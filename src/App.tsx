import { useRecoilState } from 'recoil';
import { isLoggedIn } from './atoms/atoms';

function App() {
  const [isLoggedInAtomState, setIsLoggedInAtomState] = useRecoilState(isLoggedIn);

  return (
    <>
      <h1>To do</h1>
      <div className="card">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Log in</span>
            <input type="checkbox" className="ml-5 checkbox checkbox-primary" onChange={(e) => { console.log(e.target.checked); setIsLoggedInAtomState(e.target.checked) }} />
            <div> logged: {String(isLoggedInAtomState)}</div>
          </label>
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
