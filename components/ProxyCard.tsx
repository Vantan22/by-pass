import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ProxyCardProps {
  title: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSave: () => void;
  className?: string;
}

const ProxyCard: React.FC<ProxyCardProps> = ({
  title,
  value,
  placeholder,
  onChange,
  onSave,
  className,
}) => {
  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className="w-full h-64"
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
