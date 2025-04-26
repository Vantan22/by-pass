import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
export default function WhiteList({ className }: { className?: string }) {
  const [whiteList, setWhiteList] = useState("");
  const handleSaveWhiteList = async () => {
    const response = await fetch("/api/white-list", {
      method: "POST",
      body: JSON.stringify({ items: whiteList }),
    });
    if (response.ok) {
      toast.success("Whitelist saved successfully");
    } else {
      toast.error("Error saving whitelist");
    }
  };
  const handleGetWhiteList = async () => {
    const response = await fetch("/api/white-list");
    if (response.ok) {
      const data = await response.json();
      setWhiteList(data.items.join("\n"));
    } else {
      toast.error("Error getting whitelist");
    }
  };
  useEffect(() => {
    handleGetWhiteList();
  }, []);
  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader>
        <CardTitle>Whitelist</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className="w-full h-64"
          placeholder="Enter your whitelist items..."
          value={whiteList}
          onChange={(e) => setWhiteList(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button size="lg" onClick={handleSaveWhiteList}>
          Lưu
        </Button>
      </CardFooter>
    </Card>
  );
}
