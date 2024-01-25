import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function _404() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>404 page not found</h1>
      <Button asChild>
        <Link className="" to="/login">
          Go to login page
        </Link>
      </Button>
    </div>
  );
}
