import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { handleAddQuestion } from "../store/actions/questions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  firstOption: z.string().min(6, {
    message: "First Option must be at least 6 characters.",
  }),
  secondOption: z.string().min(6, {
    message: "Second Option must be at least 6 characters.",
  }),
});
const NewQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async ({ firstOption, secondOption }) => {
    try {
      await dispatch(handleAddQuestion(firstOption, secondOption));
      navigate("/");
    } catch (error) {
      form.setError(error.type, { message: error.message });
    }
  };

  return (
    <Card className="shadow-md rounded-lg w-1/2 text-center">
      <CardHeader>
        <CardTitle>Add new question</CardTitle>
        <CardDescription className="text-balance">
          Enter first option and second option to add new question
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 "
          >
            <FormField
              control={form.control}
              name="firstOption"
              type="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Option</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter First Option"
                      className="text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.firstOption &&
                      form.formState.errors.firstOption.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second Option</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Second Option"
                      className="text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.secondOption &&
                      form.formState.errors.secondOption.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <CardFooter className="pt-4 col-span-2">
              <Button className="w-full " type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewQuestion;
