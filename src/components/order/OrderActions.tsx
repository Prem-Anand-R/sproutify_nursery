
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OrderActions: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
      <Button
        variant="sage"
        size="lg"
        className="flex-1"
        asChild
      >
        <Link to="/products">
          Continue Shopping
        </Link>
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        className="flex-1"
        asChild
      >
        <Link to="/">
          Go to Home
        </Link>
      </Button>
    </div>
  );
};

export default OrderActions;
