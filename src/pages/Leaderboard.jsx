import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Leaderboard = () => {
  const users = useSelector((state) => state.users);
  const sortedUsers = Object.values(users).sort(
    (a, b) =>
      b.questions.length +
      Object.keys(b.answers).length -
      (a.questions.length + Object.keys(a.answers).length),
  );
  return (
    <Card className="shadow-md rounded-lg w-1/2 ">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Users</TableHead>
              <TableHead>Answered</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{Object.keys(user.answers).length}</TableCell>
                <TableCell>{user.questions.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
