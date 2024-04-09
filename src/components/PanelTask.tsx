import { checkmarkDoneOutline } from "ionicons/icons";

import { IonIcon } from "@ionic/react";
import { Button } from "@/components/ui/button";

type Props = {
  handleRemove: () => void;
  handleRemoveAll: () => void;
};

const ControlsTask = ({ handleRemove, handleRemoveAll }: Props) => {
  return (
    <>
      <Button className="w-full" variant={"outline"} onClick={handleRemove}>
        <IonIcon className="mr-1" icon={checkmarkDoneOutline} />
        Clear
      </Button>
      <Button
        className="w-full"
        variant="destructive"
        onClick={handleRemoveAll}
      >
        Delete
      </Button>
    </>
  );
};

export default ControlsTask;
