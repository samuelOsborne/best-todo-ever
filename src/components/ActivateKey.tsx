import { useCallback, useEffect, useRef, useState } from "react";
import type { LemonAPIResponse, LemonAPIResponseValidateKey } from '../../types/lemonSqueezy'
import { useNavigate } from "react-router-dom";

export const ActivateKey = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const errorMessageLabel = useRef<HTMLLabelElement>(null);
    const licenseKeyRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // If key is already activated, redirect to home page
    // TODO: Add check for valid license key on boot
    // TODO: Convert to provider
    const checkIfLicenseKeyIsActivated = useCallback(() => {
        const licenseKey = window.localStorage.getItem('licenseKey');

        if (!licenseKey) {
            return;
        }

        // Reset key
        localStorage.setItem('licenseKey', '');

        fetch(import.meta.env.VITE_LEMON_SQUEEZY_VALIDATE_URL,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ license_key: licenseKey })
            }
        ).then((response) => {
            return response.json();
        }).then((response: LemonAPIResponseValidateKey) => {
            if (response.error) {
                console.log(response.error);
                setErrorMessage(response.error);
                return;
            }

            console.log(response);

            if (response.valid && response.license_key.status !== 'inactive') {
                console.log("License key is valid and active.")
                navigate('/login');
            } else {
                setErrorMessage('License key is no longer valid or has been deactivated.');
                return;
            }
        })
            .catch((error) => {
                setErrorMessage(error.message);
            })
    }, [navigate]);

    useEffect(() => {
        checkIfLicenseKeyIsActivated();
    }, [checkIfLicenseKeyIsActivated]);

    // click event handler
    const handleActiveLicenseKey = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const licenseKey = licenseKeyRef.current?.value ?? "";

        if (licenseKey === '') {
            setErrorMessage('Please enter valid license key.')
            return;
        }

        fetch(import.meta.env.VITE_LEMON_SQUEEZY_ACTIVATE_URL,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ license_key: licenseKey, instance_name: 'best-todo-ever' })
            }
        ).then((response) => {
            return response.json();
        }).then((response: LemonAPIResponse) => {
            if (response.error) {
                console.log(response.error);
                if (response.error === 'This license key has reached the activation limit.') {
                    localStorage.setItem("licenseKey", response.license_key.key);
                    navigate('/login');
                }


                setErrorMessage(response.error);
                return;
            }

            console.log(response);

            localStorage.setItem("licenseKey", response.license_key.key);

            if (response.activated) {
                navigate('/login');
            }
        })
            .catch((error) => {
                setErrorMessage(error.message);
            })
    }

    return (
        <>
            <div className="relative flex flex-col justify-center overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg rounded-lg">
                    <h1 className="text-3xl font-semibold text-center text-dark text-gray-600">best-todo-ever</h1>
                    <label className="label">
                        <span className="text-base label-text text-gray-600">Welcome</span>
                    </label>
                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">License key</span>
                            </label>
                            <input ref={licenseKeyRef} type="text" placeholder="License key" className="w-full input input-bordered input-primary" />
                        </div>
                        {
                            errorMessage !== '' && (
                                <>
                                    <span ref={errorMessageLabel} className="text-xs label-text text-error display-none">{errorMessage}</span>
                                    <br />
                                </>
                            )
                        }
                        <div className="flex flex-row gap-8 justify-center">
                            <div>
                                <button className="btn btn-primary" onClick={handleActiveLicenseKey}>Activate license</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}