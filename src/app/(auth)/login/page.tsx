import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Login — coming in Phase 2</p>
        </CardContent>
        <CardFooter>
          <Button disabled className="w-full">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
