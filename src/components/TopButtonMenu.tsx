import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import { useAuth } from './auth';

export const TopButtonMenu = () => {
    const { signOut } = useAuth();

    // Initialize state
    // First, we try to get the current theme from local storage. If there's no theme
    // stored yet, we default to 'light'.
    const initialTheme = window.localStorage.getItem('theme') || 'light';
    // We then initialize our 'theme' state variable with the initial theme.
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        // In the 'useEffect' hook that runs on component mount, we get the current theme
        // from local storage again (it might have changed since the component initialized).
        // Again, if there's no theme stored yet, we default to 'light'.
        const currentTheme = window.localStorage.getItem('theme') || 'light';
        // We then update our 'theme' state variable with the current theme.
        setTheme(currentTheme);
        // Finally, we call 'themeChange' to update the actual theme of the app. If the
        // theme is 'dark', we pass 'true' to 'themeChange', and 'false' otherwise.
        themeChange(currentTheme === 'dracula');
    }, []);

    const handleThemeChange = () => {
        // When the theme change handler is called, we first get the current theme from
        // our 'theme' state variable.
        const currentTheme = theme;
        if (currentTheme === 'dracula') {
            // If the current theme is 'dracula', we switch to the 'light' theme. We update
            // the theme in local storage, the 'theme' state variable, and call 'themeChange'
            // with 'false' to switch the actual theme of the app. Finally, we switch the
            // logo to the dracula version.
            window.localStorage.setItem('theme', 'light');
            setTheme('light');
            themeChange(false);
        } else if (currentTheme === 'light') {
            // If the current theme is not 'dracula' (so it's 'light'), we switch to the 'dracula'
            // theme. We update the theme in local storage, the 'theme' state variable, and
            // call 'themeChange' with 'true' to switch the actual theme of the app. Finally,
            // we switch the logo to the light version.
            window.localStorage.setItem('theme', 'cyberpunk');
            setTheme('cyberpunk');
            themeChange(false);
        } else if (currentTheme === 'cyberpunk') {
            window.localStorage.setItem('theme', 'dracula');
            setTheme('dracula');
            themeChange(false);
        }
    }

    return (
        <>
            <div className="join">
                <button className="btn join-item" data-toggle-theme="dracula, light" data-act-class={theme} onClick={handleThemeChange}>
                    {theme === 'dracula' && (
                        <li style={{ listStyle: "none" }}>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            </a>
                        </li>

                    )}
                    {theme === 'light' && (
                        <li style={{ listStyle: "none" }}>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> */}
                            </a>
                        </li>
                    )}
                    {theme === 'cyberpunk' && (
                        <li style={{ listStyle: "none" }}>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            </a>
                        </li>
                    )}
                </button>
                <button className="btn join-item" onClick={signOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" /></svg>
                </button>
            </div>
        </>
    )
}