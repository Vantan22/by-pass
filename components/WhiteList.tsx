import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function WhiteList() {
  const [whiteList, setWhiteList] = useState("");
  const handleSaveWhiteList = async () => {
    const response = await fetch("/api/white-list", {
      method: "POST",
      body: JSON.stringify({ items: whiteList }),
    });
    console.log(response);
  };
  const handleGetWhiteList = async () => {
    const response = await fetch("/api/white-list");
    const data = await response.json();
    setWhiteList(data.items.join("\n"));
  };
  useEffect(() => {
    handleGetWhiteList();
  }, []);
  return (
    <Card className="col-span-1">
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
          Lưu danh sách trắng
        </Button>
      </CardFooter>
    </Card>
  );
}
