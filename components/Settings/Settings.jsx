

const Settings = ({profile,setProfile,handleSubmit}) => {
  return (
    <div>
        <div className="nameInputBox">
            <input type="text" name="name" value={profile.name} onChange={setProfile({...profile, name:profile.name})}/>
        </div>
        <div className="usernameInputBox">
            <input type="text" name="Username" value={profile.username} onChange={setProfile({...profile, username:profile.username})} />
        </div>
        <div>
          <button onClick={handleSubmit}> </button>
        </div>
    </div>
  )
}

export default Settings