"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const Searchbar = () => {
  const searchSchema = z.object({
    search: z.string().min(2, {
      message: "Search must be at least 2 characters long",
    }),
  });

  const searchForm = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...searchForm}>
        <form
          onSubmit={searchForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex flex-row">
            <FormField
              control={searchForm.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      onSubmit={() => onSubmit}
                      className="w-96 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="search"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage />
            <Button className="bg-transparent dark:bg-transparent -translate-x-12" type="submit">
              <SearchIcon className="text-blue-600 bg-transparent" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
