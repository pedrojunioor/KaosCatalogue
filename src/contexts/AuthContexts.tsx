import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
    id: string
    name: string
    avatar: string
    emaill: string | null
}

type AuthContextType = {
    user: User | undefined
    sigInWithGoogle: () => Promise<void>
    logout: () => void

}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid, email } = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing Information form Google Account')
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    emaill: email
                })
            }
            else{
                setUser(undefined)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function sigInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid, email } = result.user

            if (!displayName || !photoURL) {
                throw new Error('Missing Information form Google Account')
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                emaill: email
            })
        }
    }

    function logout() {
        firebase.auth().signOut()

    }

    return (
        <div>
            <AuthContext.Provider value={{ user, sigInWithGoogle, logout }}>
                {props.children}
            </AuthContext.Provider>
        </div >
    )
}