function Counter() {
    const ctx = React.useContext(UserContext);
    
    return(
        <div>
            badBankCounter = {JSON.stringify(ctx.badBankCounter)}
            <hr/>
            createAccountCounter = {JSON.stringify(ctx.createAccountCounter)}
            <hr/>
            loginCounter = {JSON.stringify(ctx.loginCounter)}
            <hr/>
            depositCounter = {JSON.stringify(ctx.depositCounter)}
            <hr/>
            withdrawCounter = {JSON.stringify(ctx.withdrawCounter)}
            <hr/>
            balanceCounter = {JSON.stringify(ctx.balanceCounter)}
            <hr/>
            allDataCounter = {JSON.stringify(ctx.allDataCounter)}
        </div>
    );
}