"use client";
import { useAuthContext } from "@/src/contexts/AuthContext";
import Image from "next/image";
import React from "react";
import "./profile-dropdown.scss";
import { MdToken } from "react-icons/md";
import classNames from "classnames";
import { auth } from "@/src/Auth/firebase";
import Button from "../common/Button/Button";

export default function ProfileDropdown() {
  const { user, userCredits, isLoadingCredits } = useAuthContext();
  const [show, setShow] = React.useState<boolean>(false);

  const toggleProfileDropdown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShow((prevShow: boolean) => !prevShow);
  };

  const signOut = () => {
    auth.signOut().then();
    localStorage.removeItem("secret");
  };

  React.useEffect(() => {
    const onClickWindow = () => {
      setShow(false);
    };

    window.addEventListener("click", onClickWindow);
    return () => window.removeEventListener("click", onClickWindow);
  }, []);

  const renderBody = React.useCallback(() => {
    if (user) {
      return (
        <div className="profile-dropdown-container">
          <div className="profile-image" onClick={toggleProfileDropdown}>
            <Image src={user?.photoURL as string} alt="img" height={100} width={100} priority loading="eager" />
          </div>
          <div
            className={classNames("profile-dropdown-body", { show: show })}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="user-info">
              <span>{user.displayName}</span>
              <small>{user.email}</small>
            </div>
            <div className="token-info">
              {isLoadingCredits ? (
                <p className="placeholder-glow">
                  <span className="placeholder col-12 bg-light placeholder-lg" />
                </p>
              ) : (
                <div className="credits-text">
                  <MdToken />
                  <span>{userCredits?.credits || 0}</span>
                </div>
              )}
              <Button theme="light" size="sm">
                Buy credits
              </Button>
            </div>
            <div className="dropdown-button" role="button">
              Help
            </div>
            <div className="dropdown-button" role="button" onClick={signOut}>
              Sign out
            </div>
            <div className="copyright-text">
              <span>Content policy</span>
              <span>Terms</span>
              <span>About</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }, [user, show, userCredits, isLoadingCredits]);

  return renderBody();
}
