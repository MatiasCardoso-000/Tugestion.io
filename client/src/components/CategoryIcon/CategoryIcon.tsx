import {
  UtensilsIcon,
  BusIcon,
  ShoppingBagIcon,
  HeartPulseIcon,
  Gamepad2Icon,
  GraduationCapIcon,
  BriefcaseIcon,
  ZapIcon,
  HelpCircleIcon,
  HomeIcon,
} from "../Icons/Icons";

interface CategoryIconProps {
  categoryName: string;
}

export const CategoryIcon = ({ categoryName }: CategoryIconProps) => {
  const getIcon = (name: string) => {
    const normalizedName = name.toLowerCase();

    if (normalizedName.includes("comida") || normalizedName.includes("alimento") || normalizedName.includes("restaurante")) {
      return <UtensilsIcon />;
    }
    if (normalizedName.includes("transporte") || normalizedName.includes("viaje") || normalizedName.includes("auto") || normalizedName.includes("bus")) {
      return <BusIcon />;
    }
    if (normalizedName.includes("compra") || normalizedName.includes("ropa") || normalizedName.includes("shopping")) {
      return <ShoppingBagIcon />;
    }
    if (normalizedName.includes("salud") || normalizedName.includes("medico") || normalizedName.includes("farmacia")) {
      return <HeartPulseIcon />;
    }
    if (normalizedName.includes("ocio") || normalizedName.includes("juego") || normalizedName.includes("entretenimiento")) {
      return <Gamepad2Icon />;
    }
    if (normalizedName.includes("educacion") || normalizedName.includes("curso") || normalizedName.includes("universidad")) {
      return <GraduationCapIcon />;
    }
    if (normalizedName.includes("trabajo") || normalizedName.includes("negocio") || normalizedName.includes("sueldo")) {
      return <BriefcaseIcon />;
    }
    if (normalizedName.includes("servicio") || normalizedName.includes("luz") || normalizedName.includes("agua") || normalizedName.includes("internet")) {
      return <ZapIcon />;
    }
    if (normalizedName.includes("hogar") || normalizedName.includes("casa") || normalizedName.includes("alquiler")) {
      return <HomeIcon />;
    }

    return <HelpCircleIcon />;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-zinc-600">
      <div className="p-3 bg-zinc-100 rounded-full text-indigo-600">
        {getIcon(categoryName)}
      </div>
      <span className="text-sm font-medium capitalize">{categoryName}</span>
    </div>
  );
};
