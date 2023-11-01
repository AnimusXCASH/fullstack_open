import React from "react"

export const QueryCountry = ({ userQuery, userInput})=>{
    return (
          <div>
          find countries: <input value={userQuery} onChange={userInput} />
          </div>
      );
}