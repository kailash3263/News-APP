import React from "react";

const ToggleTheme = ()=>{
    return (
        <>
        <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
  <label className="form-check-label" htmlfor="flexSwitchCheckChecked">Dark Mode</label>
</div>
</>
    )
}
export default ToggleTheme;