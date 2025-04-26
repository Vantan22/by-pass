import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ProxyCardProps {
  title: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

const ProxyCard: React.FC<ProxyCardProps> = ({
  title,
  value,
  placeholder,
  onChange,
  onSave,
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className="w-full h-24"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button size="lg" onClick={onSave}>
          Lưu
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProxyCard;
