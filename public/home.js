function Home() {
    const ctx = React.useContext(UserContext);
    const [authUser,setAuthUser]                    = React.useState(ctx.currentUser.name);
    
    return(
        <div>
            <Nav
                authUser={authUser}
            />
            <Card
                txtcolor="white"
                bgcolor="primary"
                header="BadBank Landing Page"
                title="welcome to the bank"
                text="You can use this bank"
                body= {(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
            />
        </div>
    );
}