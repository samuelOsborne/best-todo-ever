import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/app');
    };

    return (
        <>
            <div className="relative flex flex-col justify-center overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg rounded-lg">
                    <h1 className="text-3xl font-semibold text-center">best-todo-ever</h1>
                    <label className="label">
                        <span className="text-base label-text ">Welcome</span>
                    </label>
                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Email Address" className="w-full input input-bordered input-primary" />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Enter Password"
                                className="w-full input input-bordered input-primary" />
                        </div>
                        <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                        <div className="flex flex-row gap-8 justify-center">
                            <div>
                                <button className="btn btn-primary" onClick={handleButtonClick}>Login</button>
                                {/* <Link to="/app">Go to New Page using Link</Link> */}
                            </div>
                            <div>
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}