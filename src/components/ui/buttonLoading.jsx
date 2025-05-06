import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonLoading({ isLoading, onClick, children }) {
    return (
        <Button onClick={onClick} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
}
