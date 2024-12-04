import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://dokvcceskuvahbgvvasu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRva3ZjY2Vza3V2YWhiZ3Z2YXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNTY2NTcsImV4cCI6MjA0NTYzMjY1N30.PAxORU6noIUrqBaSURfJq9AgsXI20H_BTM-yMjWSFO0')

export default function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else {
        return (<div>Logged in!</div>)
    }
}