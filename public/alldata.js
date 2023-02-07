function AllData() {
  const ctx = React.useContext(UserContext);
  const [documents, setDocuments] = React.useState([]);
  const [authUser,setAuthUser]    = React.useState(ctx.currentUser.name);

  

  React.useEffect(() => {
    fetch('account/all')
      .then(response => response.json())
      .then(documents => {
  
        setDocuments(documents);
        ctx.users = documents
        console.log(ctx.users)
    
        
        //documents.map(({_id, name, email, password, balance})=>{ 
           
        //console.log(`${_id} ${name} with email ${email} with password ${password} with balance ${balance}`)
        
        //});

      });
      
  }, [])
/*
  return (
    <div>
        <h5>All Data in Store</h5>
        {documents}
    </div>
);
*/
    return (
      <div>
        <Nav
        authUser={authUser}
        />
        <Card
          bgcolor="secondary"
          header="All Data"
          body={ 
            <div>
            {(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
            <ul className="list-group">

            {documents.map((user) => (
                    <li key={user._id} className="list-group-item text-secondary">
                        Account ID: {user._id}<br/>
                        Name: {user.name}<br/>
                        Email: {user.email}<br/>
                        Password: {user.password}<br/>
                        Balance: ${user.balance}
                    </li>
        
                    
                    ))}
            </ul>
            </div>
          }
        />
      </div>
    );
    
}
/*
const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

const listAll = (
    <ul>
      {documents.map((user) =>
        <li key={_id} className="list-group-item text-secondary">
          Account ID: {user._id}
          Name: {user.name}<br/>
          Email: {user.email}<br/>
          Password: {user.password}<br/>
          Balance: {user.balance}
        </li>
      )}
                */
               /*
                {ctx.users.map((user) => (
                  <li key={user.id} className="list-group-item text-secondary">
                      Account ID: {user.id}<br/>
                      Name: {user.name}<br/>
                      Email: {user.email}<br/>
                      Password: {user.password}<br/>
                      Balance: ${user.balance}
                  </li>
      
                  
                  ))}
*/

                /*
{documents.map(({_id, name, email, password, balance}) => (
                    <li key={_id} className="list-group-item text-secondary">
                        id: {_id}
                        Name: {name}<br/>
                        Email: {email}<br/>
                        Password: {password}<br/>
                        Balance: {balance}
                    </li>
                )
                )}
                */