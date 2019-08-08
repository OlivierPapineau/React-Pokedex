import * as React from "react";

export interface ILogoutButtonProps {
  loggedIn: boolean;
  logout: () => any;
}

export default function LogoutButton({ loggedIn, logout }: ILogoutButtonProps) {
  return loggedIn ? (
    <p>
      Welcome!
      <button className="btn btn-danger" onClick={logout} type="button">
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in</p>
  );
}
