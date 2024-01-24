import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Leaderboard = () => {
  const users = useSelector((state) => state.users);
  const sortedUsers = Object.values(users).sort(
    (a, b) =>
      b.questions.length +
      Object.keys(b.answers).length -
      (a.questions.length + Object.keys(a.answers).length),
  );
  return (
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
  );
};

export default Leaderboard;
