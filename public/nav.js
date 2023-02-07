function Nav(props){


    function LoginNavBar() {
    
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link
                    className   ="navbar-brand"
                    to          ="/"
                >Bad Bank
                </Link>
    
                <div className ="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link 
                                className       ="nav-link" 
                                to              ="/createaccount/"
                            >Create Account
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link 
                                className       ="nav-link disabled" 
                                to              ="/deposit/"
                            >Deposit
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className       ="nav-link disabled" 
                                to              ="/withdraw/"
                            >Withdraw
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link 
                                className       ="nav-link disabled" 
                                to              ="/alldata/"
                            >All Data 
                            </Link>
                        </li>
                      
                    </ul>
                </div>
                <div>
                    <span className="navbar-text">
                            Login to Account:
                    </span>
                    <span className="navbar-text">
                            <Link 
                                className       ="nav-link" 
                                to              ="/login/"
                                >Login
                            </Link>
                    </span>
                    
                </div>

                
            </nav>
        );
    }

    function LogoutNavBar() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link
                    className   ="navbar-brand"
                    to          ="/"
                >Bad Bank
                </Link>
    
                <div className ="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link 
                                className       ="nav-link disabled" 
                                to              ="/createaccount/"
                            >Create Account
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link 
                                className       ="nav-link" 
                                to              ="/deposit/"
                            >Deposit
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className       ="nav-link" 
                                to              ="/withdraw/"
                            >Withdraw
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className       ="nav-link" 
                                to              ="/alldata/"
                            >All Data 
                            </Link>
                        </li>
                        
                    </ul>
                    
                </div>
                <div>
                    <span className="navbar-text">
                        {props.authUser}:
                    </span>
                    <span className="navbar-text">
                            <Link 
                                className       ="nav-link" 
                                to              ="/login/"
                                >Logout
                            </Link>
                    </span>
                    
                </div>
            </nav>
        );
    }

    return (
        <div>
        {props.authUser ? 
            <LogoutNavBar
                
                /> 
            :
            <LoginNavBar
                />
        }
    </div>
)
}
   
    