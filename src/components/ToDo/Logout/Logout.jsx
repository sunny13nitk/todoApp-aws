
export default function LogoutComponent()
{

    /*
        another way to Set Authenaticated to false directly in  Logout Component
    */
    // const authContext = useAuth();
    // authContext.setAuthenticated(false);

    return (
        <div>
            <h1> You are logged out successfully!</h1>
            <div>Thanks for using our App. Come back soon...</div>
        </div>
    )
}