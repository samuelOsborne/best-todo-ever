import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { LemonAPIResponse, LemonAPIResponseValidateKey } from '../../types/lemonSqueezy'

const LicenseKeyContext = createContext({} as LicenseKeyProviderValue);

export function useLicenseKey() {
    return useContext<LicenseKeyProviderValue>(LicenseKeyContext);
}

export interface LicenseKeyProviderProps {
    children: string | JSX.Element | JSX.Element[];
}

export interface apiMessage {
    success: boolean;
    error: boolean;
    errorMessage: string;
}

export interface LicenseKeyProviderValue {
    checkIfLicenseKeyIsActivated: () => Promise<apiMessage>,
    handleActivateLicenseKey: (licenseKey: string) => Promise<apiMessage>,
    licenseKeyValue: string | undefined,
}

export function LicenseKeyProvider({ children }: LicenseKeyProviderProps) {
    const [licenseKeyValue, setLicenseKeyValue] = useState<string | undefined>(undefined);
    const [, setLoading] = useState(true)

    // On boot, if key is in local storage, set it to the state variabl3
    useEffect(() => {
        const licenseKey = window.localStorage.getItem('licenseKey');

        if (licenseKey) {
            console.log('setting license key from local storage' + licenseKey)
            setLicenseKeyValue(licenseKey);
        }
    }, []);

    // If key is already activated, redirect to home page
    const checkIfLicenseKeyIsActivated = useCallback(async (): Promise<apiMessage> => {
        const licenseKey = window.localStorage.getItem('licenseKey');

        if (!licenseKey) {
            return {
                error: true,
                success: false,
                errorMessage: 'No license key found.'
            };
        }

        // Reset key
        localStorage.setItem('licenseKey', '');
        setLicenseKeyValue('');

        const ret = await fetch(import.meta.env.VITE_LEMON_SQUEEZY_VALIDATE_URL,
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
            setLoading(false);

            if (response.error) {
                console.log(response.error);
                return {
                    error: true,
                    success: false,
                    errorMessage: response.error
                }
            }

            console.log(response);

            if (response.valid && response.license_key.status !== 'inactive') {
                console.log("License key is valid and active.")

                localStorage.setItem("licenseKey", response.license_key.key);
                setLicenseKeyValue(response.license_key.key);

                return {
                    error: false,
                    success: true,
                    errorMessage: ''
                };
                // navigate('/login');
            } else {
                return {
                    error: true,
                    success: false,
                    errorMessage: 'License key is no longer valid or has been deactivated.'
                }
            }
        }).catch((error) => {
            return {
                error: true,
                success: false,
                errorMessage: error.message
            }
            // throw (error.message);
        })

        console.log(">> Check is returning " + ret)

        return ret ?? {
            error: false,
            success: true,
            errorMessage: ''
        };
    }, []);

    const handleActivateLicenseKey = async (licenseKey: string): Promise<apiMessage> => {
        if (licenseKey === '') {
            throw Error('Please enter a valid license key.')
        }

        const ret = await fetch(import.meta.env.VITE_LEMON_SQUEEZY_ACTIVATE_URL,
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
                localStorage.setItem("licenseKey", '');
                setLicenseKeyValue('');
                return {
                    error: true,
                    success: false,
                    errorMessage: response.error
                }
            }

            console.log(response);

            setLicenseKeyValue(response.license_key.key);
            localStorage.setItem("licenseKey", response.license_key.key);

            if (response.activated) {
                return {
                    error: false,
                    success: true,
                    errorMessage: ''
                }
            }
        }).catch((error) => {
            return {
                error: true,
                success: false,
                errorMessage: error.message
            }
        })

        return ret ?? {
            error: false,
            success: true,
            errorMessage: ''
        }
    }

    const value = {
        checkIfLicenseKeyIsActivated,
        handleActivateLicenseKey,
        licenseKeyValue,
    }

    return (
        <>
            <LicenseKeyContext.Provider value={value}>
                {children}
            </LicenseKeyContext.Provider>
        </>
    )
}