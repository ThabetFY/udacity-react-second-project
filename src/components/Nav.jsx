import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { handleLogout } from "../store/actions/authedUser";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";

const Nav = ({ authedUser, avatar, name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHanlder = () => {
    dispatch(handleLogout()).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="border-b bg-secondary">
      {authedUser && (
        <div className="flex h-16 items-center px-4">
          <div className="mx-6">
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/leaderboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Leaderboard
              </Link>
              <Link
                to="/new"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                New
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt={`Avatar of ${name}`} />
                    <AvatarFallback>
                      {name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex text-center flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {authedUser}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clickHanlder}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  const avatar = user?.avatarURL || "";
  const name = user?.name || "";

  return {
    authedUser,
    avatar,
    name,
  };
};

Nav.propTypes = {
  authedUser: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
};

const connectedNav = connect(mapStateToProps)(Nav);

export default connectedNav;
