import NutritionIcon from "./nutrition-icon";
import FleetIcon from "./fleet-icon";
import ObjectIcon from "./object-icon";
import ConnectionsIcon from "./connections-icon";
import GridIcon from "./grid-icon";
import AiIcon from "./ai-icon";
import ItemIcon from "./item-icon";
import SublicenseIcon from "./sublicense-icon";
import { IconButton } from "@mui/material";

export default function Footer({ current, setCurrent, model, setModel }) {
  const iconIndex = {
    balanceTransaction: <NutritionIcon />,
    fleet: <FleetIcon />,
    sublicense: <SublicenseIcon />,
    object: <ObjectIcon />,
    connections: <ConnectionsIcon />,
    grid: <GridIcon />,
    ai: <AiIcon />,
    item: <ItemIcon />,
    query: <GridIcon />,
  };

  return (
    <div className="flex justify-between items-center w-full">
      {model.map((elem) => (
        <IconButton
          key={elem}
          className="!flex-auto"
          onClick={() => {
            setModel((prev) => {
              const at = prev.indexOf(elem);
              const update = [...prev];
              update[at] = current;
              return update;
            });
            setCurrent(elem);
          }}
        >
          {iconIndex[elem]}
        </IconButton>
      ))}
    </div>
  );
}
