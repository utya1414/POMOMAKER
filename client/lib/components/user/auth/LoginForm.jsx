"use client";

import { Button } from "@/lib/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/shadcn-ui/form";
import { Input } from "@/lib/components/shadcn-ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { user_access } from "@/api/user";

const formSchema = z.object({
  email: string().email({ message: "有効なメールアドレスを入力してください" }),
  password: string().min(8, {
    message: "パスワードは8文字以上で入力してください",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    const result = await user_access.LogIn(values.email, values.password);
    console.log(result);
    if (result.status === "success") {
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-lg border border-muted-foreground min-w-96 min-h-72 py-8 px-8 "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center text-muted-foreground">
          <Link href="signup">登録はこちら</Link>
        </div>
        <div className="flex justify-center">
          <Button type="submit">ログイン</Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
